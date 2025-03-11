import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FiUser } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onOpenLogin?: () => void;
}

export function Header({ onOpenLogin }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-3 shadow-md backdrop-blur-sm">
      <div className="container flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">FinDutch</h1>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-background/10 hover:bg-background/20"
          onClick={onOpenLogin}
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-background/20 text-foreground">
              <FiUser className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  );
} 