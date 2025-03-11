import React from 'react';
import { FaTimes, FaQuestionCircle } from 'react-icons/fa';

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpDialog({ isOpen, onClose }: HelpDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-gradient-to-b from-background to-background/95 rounded-xl w-[90%] max-w-md p-5 shadow-lg animate-in fade-in"
        style={{ animation: 'modalAppear 0.3s ease' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <FaQuestionCircle className="text-primary h-5 w-5" />
            <h2 className="text-xl font-semibold text-foreground">Help Center</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary/40 transition-all"
          >
            <FaTimes className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-4 mt-2">
          <div className="p-3 rounded-lg bg-secondary/20">
            <h3 className="font-medium text-foreground mb-1">Available Commands</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent font-mono">/record</span>
                <span className="flex-1">Record a new expense</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-mono">/group create</span>
                <span className="flex-1">Create a new expense group</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-mono">/add_friend</span>
                <span className="flex-1">Add friends to your contacts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-mono">/finalize</span>
                <span className="flex-1">Finalize expenses and calculate who owes what</span>
              </li>
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-secondary/20">
            <h3 className="font-medium text-foreground mb-1">Example Usage</h3>
            <p className="text-sm text-muted-foreground mb-2">Try these examples:</p>
            <div className="bg-background/40 rounded-lg p-2 text-sm font-mono text-foreground/90">
              /record 25 USD for dinner with friends #FamilyDinner
            </div>
          </div>

          <div className="p-3 rounded-lg bg-secondary/20">
            <h3 className="font-medium text-foreground mb-1">Need More Help?</h3>
            <p className="text-sm text-muted-foreground">
              Contact support at <a href="mailto:help@findutch.com" className="text-primary underline">help@findutch.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 