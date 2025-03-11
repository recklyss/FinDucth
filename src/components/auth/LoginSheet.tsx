import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FiMail, FiLock, FiUser, FiGithub, FiTwitter, FiFacebook } from 'react-icons/fi';

interface LoginSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginSheet({ open, onOpenChange }: LoginSheetProps) {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{isLogin ? 'Sign In' : 'Create Account'}</SheetTitle>
          <SheetDescription>
            {isLogin
              ? 'Sign in to your FinDutch account to manage your expenses.'
              : 'Create a new account to start splitting expenses with friends.'}
          </SheetDescription>
        </SheetHeader>

        <form className="space-y-4 py-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <FiGithub className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" className="flex-1">
              <FiTwitter className="mr-2 h-4 w-4" />
              Twitter
            </Button>
            <Button variant="outline" className="flex-1">
              <FiFacebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
          </div>
        </form>

        <SheetFooter className="flex-col sm:flex-col gap-2 mt-2">
          <div className="text-center text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={toggleMode}
              className="ml-1 text-primary hover:underline focus:outline-none"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>

          <SheetClose asChild>
            <Button variant="ghost" size="sm">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
} 