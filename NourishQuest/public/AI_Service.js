const axios = require('axios');
const Redis = require('ioredis');
const User = require('../models/User');

// Initialize Redis client
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Initialize model endpoints
const OLLAMA_ENDPOINT = process.env.OLLAMA_ENDPOINT || 'http://localhost:11434/api/generate';
const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Keep track of conversation history with TTL (24 hours)
const saveConversationHistory = async (userId, message, isAi) => {
  try {
    const key = `chat:history:${userId}`;
    const entry = JSON.stringify({
      text: message,
      isAi,
      timestamp: new Date().toISOString()
    });
    
    await redis.lpush(key, entry);
    await redis.ltrim(key, 0, 19); // Keep last 20 messages
    await redis.expire(key, 86400); // 24 hour TTL
  } catch (error) {
    console.error('Redis error saving conversation:', error);
  }
};

// Get conversation history
const getConversationHistory = async (userId) => {
  try {
    const key = `chat:history:${userId}`;
    const history = await redis.lrange(key, 0, -1);
    return history.map(entry => JSON.parse(entry)).reverse();
  } catch (error) {
    console.error('Redis error fetching conversation:', error);
    return [];
  }
};

// Get user context and preferences
const getUserContext = async (userId) => {
  try {
    // Try to get from cache first
    const cacheKey = `user:context:${userId}`;
    const cachedContext = await redis.get(cacheKey);
    
    if (cachedContext) {
      return JSON.parse(cachedContext);
    }
    
    // Fetch from database if not in cache
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    
    const context = {
      username: user.username,
      goals: user.goals || 'Maintain Weight',
      allergies: user.allergies || [],
      dailyCalorieGoal: user.dailyCalorieGoal || 2000,
      macros: user.macros || { protein: 50, fat: 70, carbs: 300 },
      mealPlan: user.weeklyMealPlan || {}
    };
    
    // Cache the context with 30-minute TTL
    await redis.setex(cacheKey, 1800, JSON.stringify(context));
    
    return context;
  } catch (error) {
    console.error('Error fetching user context:', error);
    // Return a default context if we can't fetch
    return {
      username: 'user',
      goals: 'Maintain Weight',
      allergies: [],
      dailyCalorieGoal: 2000,
      macros: { protein: 50, fat: 70, carbs: 300 }
    };
  }
};

// Create prompt with context
const createPromptWithContext = (message, context, history) => {
  // Convert history to formatted string
  const historyText = history.map(msg => {
    return `${msg.isAi ? 'Assistant' : 'User'}: ${msg.text}`;
  }).join('\n');
  
  // Create a system prompt with user context
  const systemPrompt = `You are a nutrition assistant for NourishQuest, a meal planning application.
User profile:
- Username: ${context.username}
- Goals: ${context.goals}
- Allergies: ${context.allergies.join(', ') || 'None'}
- Daily calorie goal: ${context.dailyCalorieGoal} calories
- Macro targets: ${context.macros.protein}g protein, ${context.macros.fat}g fat, ${context.macros.carbs}g carbs

Your role is to provide helpful, accurate nutrition advice tailored to the user's specific needs.
Use a friendly, supportive tone. Be concise but informative. Always consider the user's dietary preferences and restrictions.
For meal plans, suggest options that meet their calorie and macro targets.`;

  // Format the output differently based on model type
  return {
    ollama: {
      model: "tinyllama",
      prompt: `${systemPrompt}\n\n${historyText}\nUser: ${message}\nAssistant:`,
      stream: false
    },
    openai: {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        ...history.map(msg => ({
          role: msg.isAi ? "assistant" : "user",
          content: msg.text
        })),
        { role: "user", content: message }
      ],
      max_tokens: 150,
      temperature: 0.7
    }
  };
};

// Query Ollama model (self-hosted LLaMA)
const queryOllama = async (promptData) => {
  try {
    
    const response = await axios.post(OLLAMA_ENDPOINT, promptData);
    console.log('Ollama response received');
    return response.data.response;
  } catch (error) {
    console.error('Ollama API error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw new Error('Failed to get response from Ollama: ' + error.message);
  }
};

// Query OpenAI as fallback
const queryOpenAI = async (promptData) => {
  try {
    const response = await axios.post(OPENAI_ENDPOINT, promptData, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to get response from OpenAI');
  }
};

// To avoid rate limit issue
const queryOpenAIWithRetry = async (promptData, maxRetries = 3, initialDelay = 1000) => {
  let retries = 0;
  let delay = initialDelay;
  
  while (retries < maxRetries) {
    try {
      return await queryOpenAI(promptData);
    } catch (error) {
      if (error.response && error.response.status === 429 && retries < maxRetries - 1) {
        console.log(`Rate limited, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        retries++;
        delay *= 2; // Exponential backoff
      } else {
        throw error;
      }
    }
  }
};

// Process message with tiered approach
const processMessage = async (userId, message) => {
  try {
    // Get user context and conversation history
    const userContext = await getUserContext(userId);
    const conversationHistory = await getConversationHistory(userId);
    
    // Save user message to history
    await saveConversationHistory(userId, message, false);
    
    // Create prompts for both models
    const prompts = createPromptWithContext(message, userContext, conversationHistory);
    
    // First try with Ollama (self-hosted)
    try {
      const ollamaResponse = await queryOllama(prompts.ollama);
      
      // Save AI response to history
      await saveConversationHistory(userId, ollamaResponse, true);
      
      return {
        text: ollamaResponse,
        source: 'ollama'
      };
    } catch (ollamaError) {
      console.log('Ollama failed, falling back to OpenAI:', ollamaError.message);
      
      // Fall back to OpenAI if Ollama fails
      if (OPENAI_API_KEY) {
        const openaiResponse = await queryOpenAIWithRetry(prompts.openai);
        
        // Save AI response to history
        await saveConversationHistory(userId, openaiResponse, true);
        
        return {
          text: openaiResponse,
          source: 'openai'
        };
      } else {
        throw new Error('No AI services available');
      }
    }
  } catch (error) {
    console.error('Error processing message:', error);
    return {
      text: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment.",
      source: 'error'
    };
  }
};

module.exports = {
  processMessage,
  getUserContext,
  getConversationHistory
};
  
