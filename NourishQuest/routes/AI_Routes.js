const express = require('express');
const router = express.Router();
const axios = require('axios'); // For making API calls
const User = require('../models/User.js');

const ChatMessage = require('../models/ChatMessage');

// Get chat history
router.get('/chat/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ messages: user.chatMessages || [] });
  } catch (error) {
    console.error('Error retrieving chat history:', error);
    res.status(500).json({ error: 'Failed to retrieve chat history' });
  }
});

// Send message to AI and get response
router.post('/chat', async (req, res) => {
  try {
    const { userId, message } = req.body;
    
    if (!userId || !message) {
      return res.status(400).json({ error: 'User ID and message are required' });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Add user message to history
    user.chatMessages.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    // Save user message immediately
    await user.save();

    try {
      // Format messages correctly for OpenAI
      const systemMessage = {
        role: 'system',
        content: 'You are a helpful nutrition assistant for NourishQuest. Provide nutrition advice and meal planning tips.'
      };
      
      // Get recent messages with proper formatting
      const formattedMessages = [
        systemMessage, 
        ...user.chatMessages.slice(-10).map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      // Call OpenAI API with proper formatting
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // Use specific model name
          messages: formattedMessages,
          max_tokens: 500
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
          }
        }
      );

      const aiResponse = response.data.choices[0].message.content;

      // Add AI response to history
      user.chatMessages.push({
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      });
      
      await user.save();
      res.json({ message: aiResponse, history: user.chatMessages });
      
    } catch (apiError) {
      console.error('OpenAI API Error:', apiError.response?.data || apiError.message);

      const fallbackResponse = "Sorry, I'm having trouble connecting right now. Please try again later.";
      user.chatMessages.push({
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date()
      });
      await user.save();

      res.status(500).json({
        error: 'OpenAI API request failed',
        details: apiError.response?.data || apiError.message,
        history: user.chatMessages
      });
    }
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  } 
});

// Clear chat history
router.delete('/chat/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    user.chatMessages = [];
    await user.save();
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error clearing chat history:', error);
    res.status(500).json({ error: 'Failed to clear chat history' });
  }
});

module.exports = router;
