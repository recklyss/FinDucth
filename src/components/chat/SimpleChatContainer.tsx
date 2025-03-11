import React from 'react';
import { useChat } from '../../hooks/useChat';

export function SimpleChatContainer() {
  const { messages, loading, sendMessage } = useChat();

  const handleSendMessage = () => {
    sendMessage('Hello from simplified chat');
  };

  return (
    <div className="flex flex-col h-full border rounded-md overflow-hidden">
      <div className="p-3 bg-secondary/50 border-b font-medium">
        Chat Interface
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-secondary/20">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No messages yet. Try sending a message!
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-3 rounded-md ${message.type === 'OUTGOING'
                  ? 'bg-primary text-primary-foreground ml-auto max-w-[80%]'
                  : message.type === 'SYSTEM'
                    ? 'bg-secondary/50 text-center mx-auto max-w-[90%]'
                    : 'bg-secondary max-w-[80%]'
                  }`}
              >
                {message.content}
              </div>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex space-x-1 justify-center my-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}
      </div>

      <div className="p-3 border-t bg-background flex">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 bg-secondary/20 rounded-l-md border-r-0 focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-r-md"
        >
          Send
        </button>
      </div>
    </div>
  );
} 