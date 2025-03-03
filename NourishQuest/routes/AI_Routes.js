const express = require('express');
const router = express.Router();
const axios = require('axios');
const { processMessage, getUserContext } = require('../public/AI_Service');

// Define the endpoint
const OLLAMA_ENDPOINT = process.env.OLLAMA_ENDPOINT || 'http://localhost:11434/api/generate';

// Middleware to check authentication
const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// GET user context
router.get('/context', requireAuth, async (req, res) => {
  try {
    const context = await getUserContext(req.session.userId);
    res.json(context);
  } catch (error) {
    console.error('Error fetching context:', error);
    res.status(500).json({ error: 'Failed to fetch user context' });
  }
});

// POST message (HTTP fallback if WebSocket isn't available)
router.post('/message', requireAuth, async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    console.log('Processing message:', message);
    const response = await processMessage(req.session.userId, message);
    console.log('Response received:', response);
    res.json(response);
  } catch (error) {
    console.error('Detailed error processing message:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Failed to process message: ' + error.message });
  }
});

// GET status of AI services
router.get('/status', requireAuth, async (req, res) => {
  try {
    // Check if services are available
    const ollamaAvailable = await checkOllamaStatus();
    
    res.json({
      ollama: ollamaAvailable ? 'available' : 'unavailable',
      openai: process.env.OPENAI_API_KEY ? 'configured' : 'not-configured'
    });
  } catch (error) {
    console.error('Error checking AI status:', error);
    res.status(500).json({ error: 'Failed to check AI service status' });
  }
});

// Helper to check Ollama status
const checkOllamaStatus = async () => {
  try {
    // Simple check to see if Ollama is responding
    const response = await axios.get('http://localhost:11434/api/version');
    return response.status === 200;
  } catch (error) {
    console.error('Ollama status check error:', error.message);
    return false;
  }
};

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ status: 'ok', message: 'AI API is working' });
});

module.exports = router;
