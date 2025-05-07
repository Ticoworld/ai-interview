"use client";
import { useState } from 'react';

// !!! SECURITY WARNING: Storing API keys directly in frontend code is NOT secure.
// !!! This is for simplicity for your project demo only.
// !!! Replace "YOUR_GOOGLE_GEMINI_API_KEY" with your actual API key.
const GOOGLE_GEMINI_API_KEY = "AIzaSyCXD-f5sLfh6G3mxIEmDG7u93X4gC2uXjc";

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'Good afternoon, Olivia! How are you feeling today?', time: 'JUNE 1' },
    { sender: 'user', text: 'Good afternoon, Dr. Lopes! I’m good, looking forward to the appointment.', time: 'JUNE 1' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false); // State to indicate if AI is thinking

  const handleSend = async () => { // Made handleSend async
    if (newMessage.trim() && !isLoadingAI) { // Prevent sending if AI is loading
      const userMessage = {
        sender: 'user',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Add the user's message to the chat immediately
      setMessages([...messages, userMessage]);
      setNewMessage('');
      setIsLoadingAI(true); // Set loading state

      try {
        // --- Call the Google Gemini API directly from the frontend ---
        const response = await fetch(
          // Using gemini-2.0-flash and v1beta as seen in Google AI Studio example
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: userMessage.text }] }], // Send the user's message
            }),
          }
        );

        if (!response.ok) {
            // Attempt to read the error body if the response is not OK
            const errorBody = await response.text();
            console.error("API error response body:", errorBody);
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        // Extract the AI's response text - adjust this path if the API response structure is different
        const aiResponseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Error: Could not parse AI response.";


        const aiMessage = {
          sender: 'AI',
          text: aiResponseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        // Add the AI's response to the chat
        setMessages((currentMessages) => [...currentMessages, aiMessage]);

      } catch (error) {
        console.error("Error calling AI API:", error);
        const errorMessage = {
          sender: 'AI',
          text: "Sorry, I encountered an error getting a response. Check console for details.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((currentMessages) => [...currentMessages, errorMessage]);
      } finally {
        setIsLoadingAI(false); // Unset loading state
      }
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
         {/* Loading indicator for AI response */}
         {isLoadingAI && (
            <div className="flex justify-start">
                <div className="max-w-[70%] rounded-lg p-3 bg-blue-100">
                    <p className="text-sm text-gray-800">AI is thinking...</p>
                </div>
            </div>
         )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isLoadingAI ? "AI is responding..." : "Write your message..."}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-600"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoadingAI} // Disable input when AI is loading
          />
          <button
            onClick={handleSend}
            className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm ${isLoadingAI ? 'opacity-50 cursor-not-allowed' : ''}`} // Dim and disable button
            disabled={isLoadingAI} // Disable button when AI is loading
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}