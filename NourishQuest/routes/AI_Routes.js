const express = require('express');
const router = express.Router();
const { processMessage, getUserContext } = require('../public/AI_Service');

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
    
    const response = await processMessage(req.session.userId, message);
    res.json(response);
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Failed to process message' });
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
    const axios = require('axios');
    const OLLAMA_ENDPOINT = process.env.OLLAMA_ENDPOINT || 'http://localhost:11434/api/models';
    
    await axios.get(OLLAMA_ENDPOINT);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = router;
