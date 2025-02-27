import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, AlertCircle } from 'lucide-react';
import io from 'socket.io-client';

const NutritionAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Socket connection setup
  useEffect(() => {
    if (isOpen && !socket) {
      const socketUrl = window.location.origin; // Use same origin
      const newSocket = io(socketUrl);
      
      newSocket.on('connect', () => {
        console.log('Socket connected');
        // Authenticate with server using session info
        newSocket.emit('authenticate', {
          userId: window.userId, // You'll need to make this available in your HTML
          token: document.cookie.replace(/(?:(?:^|.*;\s*)connect\.sid\s*\=\s*([^;]*).*$)|^.*$/, "$1")
        });
      });
      
      newSocket.on('authenticated', () => {
        setConnected(true);
        setError(null);
      });
      
      newSocket.on('error', (data) => {
        console.error('Socket error:', data);
        setError(data.message);
      });
      
      newSocket.on('history', (history) => {
        if (history && history.length > 0) {
          setMessages(history);
        } else {
          // Send welcome message if no history
          setMessages([{
            id: 1,
            text: "Hi! I'm your NourishQuest AI assistant. I can help you with meal planning, nutritional advice, and reaching your health goals. What would you like to know?",
            isAi: true,
            timestamp: new Date()
          }]);
        }
      });
      
      newSocket.on('message', (message) => {
        setMessages(prev => [...prev, message]);
      });
      
      newSocket.on('typing', (data) => {
        setIsTyping(data.isTyping);
      });
      
      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
        setConnected(false);
      });
      
      setSocket(newSocket);
      
      return () => {
        newSocket.disconnect();
      };
    }
  }, [isOpen]);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSend = async () => {
    if (!input.trim() || !connected) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: input,
      isAi: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Send message to server
    socket.emit('message', { text: input });
  };

  // HTTP fallback for message sending
  const sendMessageHttp = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: input,
      isAi: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      const response = await fetch('/api/ai/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: input })
      });
      
      const data = await response.json();
      
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: data.text,
        isAi: true,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('HTTP message error:', error);
      setIsTyping(false);
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#1ce3cf] text-[#0e1b19] rounded-full p-4 shadow-lg hover:bg-[#19cbb8] transition-colors"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-96 h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="bg-[#1ce3cf] text-[#0e1b19] p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">NourishQuest AI Assistant</h3>
            <div className="flex items-center gap-2">
              {/* Connection status indicator */}
              <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-[#19cbb8] rounded-full p-1 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 p-2 flex items-center gap-2">
              <AlertCircle size={16} />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.isAi ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isAi 
                      ? 'bg-[#e8f3f2] text-[#0e1b19]' 
                      : 'bg-[#1ce3cf] text-[#0e1b19]'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70 flex justify-between">
                    <span>{formatTimestamp(message.timestamp)}</span>
                    {message.source && <span className="italic text-xs">{message.source}</span>}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#e8f3f2] text-[#0e1b19] rounded-lg p-3">
                  <p className="text-sm">Typing...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (connected ? handleSend() : sendMessageHttp())}
                placeholder="Ask about nutrition, meals, or health..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-[#1ce3cf]"
                disabled={isTyping}
              />
              <button
                onClick={connected ? handleSend : sendMessageHttp}
                className="bg-[#1ce3cf] text-[#0e1b19] rounded-full p-2 hover:bg-[#19cbb8] transition-colors disabled:opacity-50"
                disabled={!input.trim() || isTyping}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionAIChat;
