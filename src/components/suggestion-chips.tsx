import React from 'react';
import { Button } from "./ui/button";

interface SuggestionChipProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  className?: string;
}

export function SuggestionChips({ suggestions, onSelect, className }: SuggestionChipProps) {
  return (
    <div className={`flex gap-2 overflow-x-auto pb-4 ${className}`}>
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
} 