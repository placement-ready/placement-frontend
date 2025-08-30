'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, UploadCloud, Bot, User } from 'lucide-react';

type MentorCategory = 'guidance' | 'feedback' | 'knowledge' | 'IMAGE';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  category?: MentorCategory;
  imageUrl?: string;
}

const quickActions = [
  { text: "Help me set career goals", category: 'guidance' as const },
  { text: "Feedback to improve skills", category: 'feedback' as const },
  { text: "Industry insights and trends", category: 'knowledge' as const },
];

const mentorResponses = {
  guidance: [
    "Great question! Here's a simple step-by-step plan to help you move forward.",
    "Let's focus on your strengths and build a practical approach together.",
    "Here are some actionable steps based on your current situation.",
  ],
  feedback: [
    "Your progress looks promising! Some areas you can improve further...",
    "I commend your dedication. Here's some feedback to reach new heights.",
    "You've made noticeable improvements! Consider these suggestions.",
  ],
  knowledge: [
    "Based on industry experience, this method has worked well.",
    "Market trends show this focus area is very relevant now.",
    "Try these proven strategies I've seen succeed in similar cases.",
  ],
  IMAGE: [
    "I've received your image! Here's what I see: (Image analysis would be shown here, such as resume feedback, diagram explanation, etc.)",
  ]
};

const MentorChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Career Mentor. How can I assist you with your career or personal growth today?",
      isBot: true,
      timestamp: new Date(),
      category: 'guidance'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current) messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send a text message
  const handleSendMessage = (text?: string, category?: Message['category']) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Display user message
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        text: messageText,
        isBot: false,
        timestamp: new Date(),
        category,
      }
    ]);
    setInputValue('');
    setIsTyping(true);

      const responses = mentorResponses[(category ?? 'guidance') as MentorCategory];
    setTimeout(() => {
      const responses = mentorResponses[category ?? 'guidance'];
      const botReply = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: botReply,
          isBot: true,
          timestamp: new Date(),
          category: category || 'guidance',
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  // Upload and display image, then answer about image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]; // Correct usage!
      const imageUrl = URL.createObjectURL(file);
      // Display user image
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "You uploaded an image.",
          isBot: false,
          timestamp: new Date(),
          category: 'IMAGE',
          imageUrl,
        }
      ]);
      setIsTyping(true);
      // Simulate bot "analysis" of image
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: mentorResponses.IMAGE[0],
            isBot: true,
            timestamp: new Date(),
            category: 'IMAGE',
            imageUrl,
          }
        ]);
        setIsTyping(false);
      }, 1800);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col max-w-4xl mx-auto relative">

      {/* Mentor Card */}
      <div className="bg-white shadow rounded-xl flex items-center px-6 py-4 my-4">
        <Bot className="w-10 h-10 text-green-600 bg-green-100 rounded-full p-2 mr-4" />
        <div>
          <h2 className="font-semibold text-xl text-green-800">HireMind AI Mentor</h2>
          <p className="text-sm text-gray-600">Active now – Upload files or ask anything!</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 pb-32">
        {messages.map(({ id, text, isBot, timestamp, category, imageUrl }) => (
          <div key={id} className={`my-4 flex ${isBot ? "justify-start" : "justify-end"}`}>
            <div className={`rounded-xl shadow px-5 py-3 ${isBot ? "bg-white" : "bg-green-500 text-white"} max-w-[65%]`}>
              {imageUrl && (
                <img src={imageUrl} alt="uploaded content" className="rounded-lg mb-2 max-h-48" />
              )}
              <p className="whitespace-pre-wrap">{text}</p>
              <div className="mt-2 flex items-center text-xs justify-between">
                <span className="opacity-50">{timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                {category && <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">{category}</span>}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="my-4 flex justify-start">
            <div className="rounded-xl shadow px-5 py-3 bg-white max-w-[65%]">
              <span className="text-gray-400">Mentor is typing...</span>
            </div>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="absolute left-0 right-0 bottom-24 flex justify-center gap-2 px-2">
        {quickActions.map(({ text, category }) => (
          <button
            key={text}
            className="px-4 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition font-semibold"
            onClick={() => handleSendMessage(text, category)}
          >{text}</button>
        ))}
      </div>

      {/* Input + Upload */}
      <div className="absolute left-0 right-0 bottom-0 px-2 py-3 bg-white border-t border-green-100 flex items-center gap-3">
        <label className="flex items-center cursor-pointer">
          <UploadCloud className="w-7 h-7 mr-2 text-green-600" />
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          <span className="text-green-700 font-medium">Upload Image</span>
        </label>
        <textarea
          value={inputValue}
          className="flex-1 p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-400 resize-none"
          placeholder="Type your question or concern here..."
          rows={1}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <button
          className="rounded-lg bg-green-500 text-white p-3 font-bold shadow hover:bg-green-600 transition flex items-center"
          onClick={() => handleSendMessage()}
          disabled={!inputValue.trim()}
        >
          <Send className="w-6 h-6"/>
        </button>
      </div>
    </div>
  );
};

export default MentorChatbot;
