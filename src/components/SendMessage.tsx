import React, { ChangeEvent, FormEvent, useState } from 'react';

interface SendMessageProps {
  handleNewMessage: (message: string) => void;
}

const SendMessage: React.FC<SendMessageProps> = ({ handleNewMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleNewMessage(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4 mt-auto">
      <label htmlFor="message" className="font-bold">Type your message:</label>
      <input
        type="text"
        id="message"
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600">Send</button>
    </form>
  );
};

export default SendMessage;
