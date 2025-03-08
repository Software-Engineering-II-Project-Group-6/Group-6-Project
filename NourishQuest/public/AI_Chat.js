document.addEventListener('DOMContentLoaded', function() {
  const chatIcon = document.getElementById('chat-icon');
  const chatContainer = document.getElementById('chat-container');
  const toggleChat = document.getElementById('toggle-chat');
  const closeChat = document.getElementById('close-chat');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const messagesContainer = document.getElementById('messages-container');
  
  // Get user ID from the session (implement according to your session management)
  const userId = window.currentUserId || document.querySelector('meta[name="user-id"]')?.getAttribute('content');  
  toggleChat.addEventListener('click', function() {
    chatIcon.classList.add('hidden');
    chatContainer.classList.remove('hidden');
    // Load chat history when opened
    loadChatHistory();
  });
  
  closeChat.addEventListener('click', function() {
    chatContainer.classList.add('hidden');
    chatIcon.classList.remove('hidden');
  });

  // Load chat history when page loads
  loadChatHistory();
  
  // Send message when button is clicked
  sendButton.addEventListener('click', sendMessage);
  
  // Send message when Enter key is pressed
  messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  
  // Function to load chat history
  function loadChatHistory() {
    fetch(`/api/ai/chat/${userId}`)
      .then(response => response.json())
      .then(data => {
        messagesContainer.innerHTML = '';
        data.messages.forEach(message => {
          addMessageToUI(message.role, message.content);
        });
        scrollToBottom();
      })
      .catch(error => {
        console.error('Error loading chat history:', error);
      });
  }
  
  // Function to send message
  function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;
    
    // Add user message to UI
    addMessageToUI('user', message);
    messageInput.value = '';
    scrollToBottom();
    
    // Add loading indicator
    const loadingElement = document.createElement('div');
    loadingElement.className = 'chat-message assistant loading';
    loadingElement.innerHTML = '<div class="message-content"><div class="typing-indicator"><span></span><span></span><span></span></div></div>';
    messagesContainer.appendChild(loadingElement);
    scrollToBottom();
    
    // Send message to server
    fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        message
      })
    })
      .then(response => response.json())
      .then(data => {
        // Remove loading indicator
        messagesContainer.removeChild(loadingElement);
        
        // Add AI response to UI
        addMessageToUI('assistant', data.message);
        scrollToBottom();
      })
      .catch(error => {
        console.error('Error sending message:', error);
        // Remove loading indicator
        messagesContainer.removeChild(loadingElement);
        
        // Add error message
        addMessageToUI('system', 'Sorry, there was an error processing your message. Please try again.');
        scrollToBottom();
      });
  }
  
  // Function to add message to UI
  function addMessageToUI(role, content) {
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${role}`;
    
    const avatar = role === 'user' ? '👤' : '🤖';
    
    messageElement.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-content">${formatMessage(content)}</div>
    `;
    
    messagesContainer.appendChild(messageElement);
  }
  
  // Function to format message with Markdown-like syntax
  function formatMessage(content) {
    // Convert URLs to links
    content = content.replace(
      /(https?:\/\/[^\s]+)/g, 
      '<a href="$1" target="_blank" class="text-[#1ce3cf] underline">$1</a>'
    );
    
    // Convert **text** to bold
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert *text* to italic
    content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert line breaks to <br>
    content = content.replace(/\n/g, '<br>');
    
    return content;
  }
  
  // Function to scroll to bottom of chat
  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
});
