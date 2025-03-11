import React, { useState, useEffect, useRef } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { CommandSuggestion } from '../../types';
import { mockCommandApi } from '../../api/mock/commands';
import { FiSend } from 'react-icons/fi';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  loading: boolean;
}

export function ChatInput({ onSendMessage, loading }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState<CommandSuggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Get command suggestions when typing a command
  useEffect(() => {
    const getSuggestions = async () => {
      if (message.startsWith('/')) {
        const results = await mockCommandApi.getSuggestions(message);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    };

    getSuggestions();
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || loading) return;

    onSendMessage(message);
    setMessage('');
    setSuggestions([]);
  };

  const handleSuggestionClick = (command: string) => {
    setMessage(command + ' ');
    setSuggestions([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative">
      {suggestions.length > 0 && (
        <Card className="absolute bottom-full mb-2 left-0 right-0 mx-3 overflow-hidden shadow-lg border-border/50 bg-background/95 backdrop-blur-sm z-10">
          <div className="max-h-[200px] overflow-y-auto p-1">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.command}
                className="p-2 hover:bg-accent/30 rounded cursor-pointer transition-colors"
                onClick={() => handleSuggestionClick(suggestion.command)}
              >
                <div className="font-mono font-medium text-sm">{suggestion.command}</div>
                <div className="text-xs text-muted-foreground">{suggestion.description}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <form
        onSubmit={handleSubmit}
        className="p-3 border-t bg-background/80 backdrop-blur-sm flex gap-2 items-center sticky bottom-0"
      >
        <Input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={loading ? "Processing..." : "Type a message or command (start with /)"}
          disabled={loading}
          className="flex-1 bg-background/50 border-border/50"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || loading}
          className="rounded-full h-10 w-10 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-sm"
        >
          <FiSend className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
} 