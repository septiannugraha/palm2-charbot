import React, { useState } from 'react';
import DialogueItem from './DialogueItem';

interface DialogueContainerProps {
  dialogues: { user: string; bot: string }[];
  setDialogues: React.Dispatch<React.SetStateAction<{ user: string; bot: string }[]>>;
}

const DialogueContainer: React.FC<DialogueContainerProps> = ({ dialogues, setDialogues }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const handleAddRow = () => {
    setDialogues([...dialogues, { user: '', bot: '' }]);
  };

  const handleInputChange = (index: number, field: keyof { user: string; bot: string }, value: string) => {
    const updatedDialogues = [...dialogues];
    updatedDialogues[index][field] = value;
    setDialogues(updatedDialogues);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold mb-4">Dialogue Container</h2>
      <button onClick={toggleCollapse} className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 mb-2">
        {isCollapsed ? 'Expand' : 'Collapse'}
      </button>
      {!isCollapsed && (
        <>
          {dialogues.map((item, index) => (
            <DialogueItem key={index} item={item} onChange={handleInputChange} index={index} />
          ))}
          <button onClick={handleAddRow} className="px-4 py-2 mt-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-600">
            Add Row
          </button>
        </>
      )}
    </div>
  );
};

export default DialogueContainer;
