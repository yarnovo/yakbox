import { ChatWindow } from './components/ChatWindow';
import type { ChatMessage } from './components/MessageList';

function App() {
  const handleSendMessage = (message: ChatMessage) => {
    console.log('Message sent:', message);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl h-screen flex flex-col items-center justify-center">
        <div className="h-[80%] w-full">
          <ChatWindow
            title="Demo Chat"
            placeholder="Enter your message here..."
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
