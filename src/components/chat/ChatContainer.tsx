import React, { useRef, useEffect } from 'react';
import { Message } from './Message';
import { ChatInput } from './ChatInput';
import { useChat } from '../../hooks/useChat';

export const ChatContainer: React.FC = () => {
  const { messages, loading, sendMessage, activeGroup, switchGroup, groups } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="quick-action">
        <div
          className={`action-button ${activeGroup === null ? 'active' : ''}`}
          onClick={() => switchGroup(null)}
        >
          All
        </div>

        {groups.map((group) => (
          <div
            key={group.id}
            className={`action-button ${activeGroup === group.id ? 'active' : ''}`}
            onClick={() => switchGroup(group.id)}
          >
            #{group.name}
          </div>
        ))}

        <div
          className="action-button"
          onClick={() => sendMessage('/group create')}
        >
          + New Group
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={sendMessage} loading={loading} />
    </div>
  );
}; 