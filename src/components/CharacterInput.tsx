import React, { ChangeEvent, FormEvent, useState } from 'react';

interface CharacterInputProps {
  setCharacter: (value: string) => void;
  disabled: boolean;
  isLoading: boolean
}

const CharacterInput: React.FC<CharacterInputProps> = ({ setCharacter, disabled, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!disabled) {
      setCharacter(inputValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4">
      <label htmlFor="character" className="font-bold">Set chatbot character:</label>
      <input
        type="text"
        id="character"
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        disabled={disabled}
      />
      {isLoading && (
        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
        </svg>
      )}
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600" disabled={disabled}>Set</button>
    </form>
  );
};

export default CharacterInput;
