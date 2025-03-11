import React, { useRef, useEffect } from 'react';
import { Message, MessageProps } from './message';

interface MessageListProps {
  messages: Omit<MessageProps, 'className'>[];
  className?: string;
  isTyping?: boolean;
}

export function MessageList({ messages, className, isTyping = false }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className={`flex-1 p-4 overflow-y-auto flex flex-col scroll-smooth ${className}`}>
      {/* Welcome message */}
      <div className="self-center bg-background/60 backdrop-blur-sm rounded-lg px-4 py-2 text-sm text-muted-foreground max-w-[90%] text-center mb-4 shadow-sm">
        Welcome to FinDutch! Your AI expense splitting assistant.
      </div>

      {messages.map((message) => (
        <Message
          key={message.id}
          {...message}
        />
      ))}

      {/* Typing indicator */}
      {isTyping && (
        <div className="flex p-2 bg-background rounded-2xl self-start mb-4 shadow-sm">
          <div className="w-2 h-2 bg-foreground rounded-full mr-1 animate-typing-1"></div>
          <div className="w-2 h-2 bg-foreground rounded-full mr-1 animate-typing-2"></div>
          <div className="w-2 h-2 bg-foreground rounded-full animate-typing-3"></div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
} 