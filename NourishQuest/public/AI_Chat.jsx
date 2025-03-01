import React from 'react';
import { createRoot } from 'react-dom/client';
import NutritionAIChat from '../protected/components/NutritionAIChat';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('ai-chat-container');

  if (container) {
    const root = createRoot(container);
    
    // Fetch user data first
    fetch('/api/current-user')
      .then(response => response.ok ? response.json() : null)
      .then(userData => {
        if (userData && userData._id) {
          // If we have user data, set it for socket auth
          window.userId = userData._id;
          console.log('User authenticated, ID available for chat:', userData._id);
        } else {
          console.warn('User data not available, chat may not function');
        }
        // Render component
        root.render(<NutritionAIChat />);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        root.render(<NutritionAIChat />);
      });
  }
});
