"use client";
import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'Good afternoon, Olivia! How are you feeling today?', time: 'JUNE 1' },
    { sender: 'user', text: 'Good afternoon, Dr. Lopes! I’m good, looking forward to the appointment.', time: 'JUNE 1' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { 
        sender: 'user', 
        text: newMessage, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
      setNewMessage('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Interview Chat</h3>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'AI' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[70%] rounded-lg p-3 ${
              msg.sender === 'AI' ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <p className="text-sm text-gray-800">{msg.text}</p>
              <span className="text-xs text-gray-500 mt-1 block">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-600"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}