import React, { useRef, useEffect } from 'react';
import { Message } from './Message';
import { ChatInput } from './ChatInput';
import { QuickAction } from './QuickAction';
import { useChat } from '../../hooks/useChat';

export function ChatContainer() {
  const { messages, loading, sendMessage, activeGroup, switchGroup, groups } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleCreateGroup = () => {
    sendMessage('/group create');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      <QuickAction
        activeGroup={activeGroup}
        groups={groups}
        onSwitchGroup={switchGroup}
        onCreateGroup={handleCreateGroup}
      />

      <div className="flex-1 overflow-y-auto p-4 flex flex-col bg-secondary/30">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

        {loading && (
          <div className="self-start bg-background rounded-full px-3 py-2 mb-4 flex items-center space-x-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={sendMessage} loading={loading} />
    </div>
  );
} 