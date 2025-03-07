import React from 'react';
import { ThemeToggle } from './theme-toggle';

export const Header: React.FC = () => {
  const currentUser = {
    name: 'John Doe',
    initials: 'J',
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">FinDutch</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="user-menu">
            {currentUser.initials}
          </div>
        </div>
      </div>
    </header>
  );
}; 