import { useState } from 'react';
import { FaTimes, FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export function AuthDialog({ isOpen, onClose, initialMode = 'login' }: AuthDialogProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would authenticate here
    console.log('Submitted:', { username, email, password, mode });

    // For now, just close the dialog
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-gradient-to-b from-background to-background/95 rounded-xl w-[90%] max-w-md p-5 shadow-lg animate-in fade-in"
        style={{ animation: 'modalAppear 0.3s ease' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-foreground">{mode === 'login' ? 'Sign In' : 'Create Account'}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary/40 transition-all"
          >
            <FaTimes className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium block text-foreground">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="text-muted-foreground" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium block text-foreground">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUser className="text-muted-foreground" />
              </div>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
                placeholder="johndoe"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium block text-foreground">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-muted-foreground" />
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                placeholder="********"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-primary hover:underline transition-all"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-primary hover:underline transition-all"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
} 