import React, { useEffect, useState } from 'react';

export interface ChatItem {
  sender: 'user' | 'bot';
  message: string;
  timestamp: string;
}

interface ChatHistoryProps {
  chatItems: ChatItem[];
  isLoading: boolean
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatItems, isLoading }) => {
  return (
    <div
      className={`p-4 space-y-4 h-96 overflow-auto bg-gray-100 shadow-inner ${chatItems.length === 0 ? 'h-20' : ''
        }`}
    >
      {chatItems.map((item, index) => (
        <div key={index} className={`flex items-start ${item.sender === 'user' ? 'justify-end' : ''}`}>
          <div className={`rounded-lg px-4 py-2 ${item.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
            <div>{item.message}</div>
            <div className="text-right text-xs mt-1">{item.timestamp}</div>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex items-start">
          <div className="rounded-lg px-4 py-2 bg-gray-300 text-gray-800">
            <div>Thinking...</div>
          </div>
        </div>
      )}
    </div>
  );
};


export default ChatHistory;
