import React from 'react';
import ReactDOM from 'react-dom';
import NutritionAIChat from '../protected/components/NutritionAIChat';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('ai-chat-container');
  if (container) {
    // Fetch user data using promises
    fetch('/api/current-user')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        console.warn('User not authenticated or API error, chat may not function properly');
        return null;
      })
      .then(userData => {
        if (userData) {
          // Set userId globally for the chat component to use
          window.userId = userData._id || userData.userId;
          console.log('User authenticated, initializing chat component');
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      })
      .finally(() => {
        // Render the component regardless of fetch success
        ReactDOM.render(<NutritionAIChat />, container);
      });
  } else {
    console.warn('AI Chat container not found');
  }

});
