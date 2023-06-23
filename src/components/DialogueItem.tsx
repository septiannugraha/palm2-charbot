import React, { ChangeEvent } from 'react';

interface DialogueItemProps {
  item: { user: string; bot: string };
  onChange: (index: number, field: keyof { user: string; bot: string }, value: string) => void;
  index: number;
}

const DialogueItem: React.FC<DialogueItemProps> = ({ item, onChange, index }) => {
  const handleInputChange = (field: keyof { user: string; bot: string }, e: ChangeEvent<HTMLInputElement>) => {
    onChange(index, field, e.target.value);
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <input
        type="text"
        value={item.user}
        placeholder="User message"
        onChange={(e) => handleInputChange('user', e)}
        className="px-4 py-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        value={item.bot}
        placeholder="Bot reply"
        onChange={(e) => handleInputChange('bot', e)}
        className="px-4 py-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default DialogueItem;
