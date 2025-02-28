import React from 'react';
import ReactDOM from 'react-dom';
import NutritionAIChat from '../protected/components/NutritionAIChat';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('ai-chat-container');
  if (container) {
    try {
      const response = await fetch('/api/currentuser');
      if(response.ok) {
        const userData = await response.json();
        window.userId = userData.id || userData.Id;
        console.log('User authenticated, initializing chat component');
      } else {
        console.warn('User not authenticated or API error, chat may not function properly');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    ReactDOM.render(<NutritionAIChat />, container);
  } else {
    console.warn('AI Chat container not found');
  }

});
