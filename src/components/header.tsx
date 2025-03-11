import React from 'react';

interface HeaderProps {
  username?: string;
  onAvatarClick: () => void;
}

export function Header({ username, onAvatarClick }: HeaderProps) {
  // Get user initials from username
  const getInitials = (name: string) => {
    if (!name) return 'G'; // Guest
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-4 px-4 flex justify-between items-center shadow-md sticky top-0 z-10 backdrop-blur-md">
      <h1 className="text-xl font-bold text-shadow">FinDutch</h1>

      <button
        className="w-9 h-9 rounded-full bg-gradient-to-r from-background to-background/90 text-foreground flex items-center justify-center font-medium shadow-sm hover:scale-105 transition-transform cursor-pointer"
        onClick={onAvatarClick}
      >
        {getInitials(username || '')}
      </button>
    </header>
  );
} 