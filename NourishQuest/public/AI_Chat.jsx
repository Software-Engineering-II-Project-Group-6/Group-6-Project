import React from 'react';
import ReactDOM from 'react-dom';
import NutritionAIChat from '../protected/components/NutritionAIChat';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('ai-chat-container');
  if (container) {
    ReactDOM.render(<NutritionAIChat />, container);
  }
});
