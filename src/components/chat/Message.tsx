import React from 'react';
import { cn } from '../../lib/utils';

export interface MessageProps {
  id: string;
  text: string;
  sender: 'user' | 'assistant' | 'system' | string;
  timestamp?: Date;
  username?: string;
  className?: string;
  groupId?: string;
}

export function Message({ id, text, sender, timestamp, username, className, groupId }: MessageProps) {
  // System message (centered notification)
  if (sender === 'system') {
    return (
      <div 
        className={cn(
          "self-center bg-background/30 backdrop-blur-sm rounded-lg px-4 py-2 text-sm text-muted-foreground max-w-[90%] text-center mb-4 shadow-sm",
          className
        )}
      >
        {groupId && (
          <span className="inline-block bg-primary/80 text-primary-foreground px-2 py-0.5 rounded text-xs mr-2">
            {groupId}
          </span>
        )}
        {text}
      </div>
    );
  }

  const isOutgoing = sender === 'user';
  const displayName = isOutgoing ? 'You' : (username || 'FinDutch AI');

  return (
    <div 
      className={cn(
        "max-w-[85%] mb-4 animate-in fade-in slide-in-from-bottom-5 duration-300",
        isOutgoing ? "self-end" : "self-start",
        className
      )}
    >
      <div className="flex items-center justify-between mb-1 text-xs">
        <span className="font-medium text-muted-foreground">{displayName}</span>
        {timestamp && (
          <span className="text-muted-foreground">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>

      <div 
        className={cn(
          "p-3 rounded-2xl shadow-sm",
          isOutgoing
            ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-sm"
            : "bg-background rounded-bl-sm"
        )}
      >
        {groupId && (
          <span className="inline-block bg-primary/80 text-primary-foreground px-2 py-0.5 rounded text-xs mr-2">
            {groupId}
          </span>
        )}
        <div className="leading-relaxed">{text}</div>
      </div>
    </div>
  );
} 