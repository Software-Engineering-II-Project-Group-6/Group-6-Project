import React from 'react';
import { createRoot } from 'react-dom/client';
import NutritionAIChat from '../protected/components/NutritionAIChat';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('ai-chat-container');
  
  if (container) {
    // Get userId directly from the DOM element
    const userId = container.dataset.userId;
    
    const root = createRoot(container);
    // Pass it as a prop
    root.render(<NutritionAIChat userId={userId} />);
  } else {
    console.warn('AI Chat container not found');
  }

});
