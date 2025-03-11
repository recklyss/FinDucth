import React, { useState, useRef, useEffect } from 'react';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaPaperPlane } from "react-icons/fa";
import { FaTerminal, FaUserPlus, FaUsers, FaCalculator, FaQuestionCircle } from "react-icons/fa";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  className?: string;
}

interface CommandSuggestion {
  command: string;
  icon: React.ReactNode;
}

export function ChatInput({ onSendMessage, placeholder = "Type a message or command (e.g., /record)", className }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandSuggestions: CommandSuggestion[] = [
    { command: '/record', icon: <FaTerminal /> },
    { command: '/add_friend', icon: <FaUserPlus /> },
    { command: '/group', icon: <FaUsers /> },
    { command: '/finalize', icon: <FaCalculator /> },
    { command: '/help', icon: <FaQuestionCircle /> },
  ];

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  const handleCommandSelect = (command: string) => {
    setInputValue(command + ' ');
    inputRef.current?.focus();
  };

  useEffect(() => {
    // Check if input starts with '/' to show suggestion
    if (inputValue.startsWith('/')) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue]);

  return (
    <>
      {/* Command suggestions */}
      {showSuggestions && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur-md rounded-xl p-3 shadow-lg w-[90%] max-w-md border border-accent/20 animate-in z-10" style={{ animation: 'slideUp 0.3s ease' }}>
          <div className="text-sm font-medium text-primary mb-2">Available commands:</div>
          <div className="flex flex-wrap gap-2">
            {commandSuggestions.map((suggestion, index) => (
              <button
                key={index}
                className="bg-secondary/60 hover:bg-accent hover:text-white px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer"
                onClick={() => handleCommandSelect(suggestion.command)}
              >
                <span className="mr-1.5">{suggestion.icon}</span>
                {suggestion.command}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={`px-4 py-3 bg-background border-t border-accent/30 flex gap-2 items-center ${className}`}>
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-secondary/20 border-accent/30 rounded-3xl py-3 px-4 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-inner"
        />
        <Button
          onClick={handleSend}
          size="icon"
          className="w-11 h-11 rounded-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md hover:scale-105 hover:rotate-[5deg] transition-all"
        >
          <FaPaperPlane className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
} 