import React, { useState, useEffect, useRef } from 'react';
import { CommandSuggestion } from '../../types';
import { mockCommandApi } from '../../api/mock/commands';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  loading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, loading }) => {
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
    <div className="chat-input-container">
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.command}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion.command)}
            >
              <div className="suggestion-command">{suggestion.command}</div>
              <div className="suggestion-description">{suggestion.description}</div>
            </div>
          ))}
        </div>
      )}

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={loading ? "Processing..." : "Type a message or command (start with /)"}
          disabled={loading}
          className="chat-input"
        />
        <button
          type="submit"
          disabled={!message.trim() || loading}
          className="send-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="20"
            height="20"
          >
            <path d="M22 2L11 13"></path>
            <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
          </svg>
        </button>
      </form>
    </div>
  );
}; 