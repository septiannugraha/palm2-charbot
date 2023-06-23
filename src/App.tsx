import React, { useEffect, useState } from 'react';
import ChatHistory, { ChatItem } from './components/ChatHistory';
import CharacterInput from './components/CharacterInput';
import DialogueContainer from './components/DialogueContainer';
import SendMessage from './components/SendMessage';
import Collapsible from 'react-collapsible';

function getCurrentTimestamp() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours || 12; // Convert to 12-hour format
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

interface Dialogue {
  user: string;
  bot: string;
}

interface CharacterDetails {
  name: string,
  bio: string;
  char_style: string;
  example_chats: Dialogue[];
}


function App() {
  const [character, setCharacter] = useState('');
  const [dialogues, setDialogues] = useState<ChatItem[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  // Add a new state variable for the example dialogues
  const [characterDetails, setCharacterDetails] = useState<CharacterDetails | null>(null);
  const [characterSubmitted, setCharacterSubmitted] = useState(false);

  const handleNewSession = () => {
    setCharacter('');
    setCharacterDetails(null);
    setDialogues([]);
    setCharacterSubmitted(false);
  };

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      setIsLoading(true)
      const response = await fetch('/detail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          character: character
        })
      });

      if (response.ok) {
        const data = await response.json();
        setCharacterDetails(data.result);
        setCharacterSubmitted(true)
      }
      setIsLoading(false)
    };

    if (character) {
      fetchCharacterDetails();
    }
  }, [character]);

  const handleNewMessage = async (message: string) => {
    // Add the user's message to the dialogues immediately
    setDialogues(prevDialogues => [...prevDialogues, { sender: 'user', message, timestamp: getCurrentTimestamp() }]);

    setIsLoading(true)

    // Prepare the request body
    if (characterDetails) {
      const exampleChatsFormatted = characterDetails.example_chats.map(chat => [chat.user, chat.bot]);
      const requestBody = {
        character: characterDetails.name,
        style: characterDetails.char_style,
        examples: exampleChatsFormatted,
        history: dialogues.map(dialogue => dialogue.message),
        message: message
      };

      // Send a POST request to the /chat endpoint
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      // Parse the response
      const responseData = await response.json();
      setIsLoading(false)

      // Use the response data to update the dialogues
      setDialogues(prevDialogues => [...prevDialogues, { sender: 'bot', message: responseData.result, timestamp: getCurrentTimestamp() }]);
    }
  };

  return (
    <div id="app" className="h-screen bg-gray-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl mb-6 text-center font-bold text-blue-500">CharBot</h1>
      <div className="bg-white p-8 max-h-[calc(100vh-8rem)] rounded-xl shadow-lg w-full max-w-4xl space-y-4">
        {!characterSubmitted &&
          <CharacterInput setCharacter={setCharacter} isLoading={isLoading} disabled={characterSubmitted} />
        }
        {characterSubmitted && (
          <button onClick={handleNewSession} className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600">New Session</button>
        )}
        {characterDetails && (
          <>
            <p><strong>Name:</strong> {character}</p>
            <p><strong>Bio:</strong> {characterDetails.bio}</p>
            <p><strong>Character Style:</strong> {characterDetails.char_style}</p>
            <Collapsible trigger="Example Dialogues">
              {characterDetails.example_chats.map((dialogue, index) => (
                <div key={index}>
                  <p><strong>User:</strong> {dialogue.user}</p>
                  <p><strong>Bot:</strong> {dialogue.bot}</p>
                </div>
              ))}
            </Collapsible>
          </>
        )}
        <ChatHistory chatItems={dialogues} isLoading={isLoading} />
        <SendMessage handleNewMessage={handleNewMessage} />
      </div>
    </div>
  );
}

export default App;