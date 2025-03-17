import { useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: string;
}

const App = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey there! 👋",
      sender: "other",
      timestamp: "12:00 PM"
    },
    {
      id: 2,
      text: "Hi! How are you?",
      sender: "user",
      timestamp: "12:01 PM"
    },
    {
      id: 3,
      text: "I'm doing great! Thanks for asking.",
      sender: "other",
      timestamp: "12:02 PM"
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <span className="text-xl font-bold px-4">Chat Demo</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat ${message.sender === "user" ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-bubble">
              {message.text}
            </div>
            <div className="chat-footer opacity-50 text-xs">
              {message.timestamp}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 bg-base-100">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Type a message..."
            className="input input-bordered join-item w-full"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="btn btn-primary join-item">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
