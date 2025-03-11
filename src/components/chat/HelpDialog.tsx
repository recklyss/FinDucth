import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { FiCommand, FiInfo, FiHelpCircle, FiMessageSquare, FiDollarSign, FiUsers, FiLightbulb } from 'react-icons/fi';

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FiHelpCircle className="h-5 w-5" />
            FinDutch Help
          </DialogTitle>
          <DialogDescription>
            Your AI expense splitting assistant
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <section>
            <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
              <FiCommand className="h-4 w-4" />
              Available Commands
            </h3>
            <ul className="space-y-2 text-sm">
              <CommandItem
                command="/record"
                description="Record a new expense"
                example="/record I paid 30 USD for dinner with @Alice"
              />
              <CommandItem
                command="/group create"
                description="Create a new expense group"
                example="/group create #Tokyo"
              />
              <CommandItem
                command="/add_friend"
                description="Add friends to your contacts"
                example="/add_friend @Bob @Charlie"
              />
              <CommandItem
                command="/finalize"
                description="Finalize and settle up expenses"
                example="/finalize #Apartment"
              />
              <CommandItem
                command="/help"
                description="Show this help dialog"
                example="/help"
              />
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
              <FiLightbulb className="h-4 w-4" />
              Tips
            </h3>
            <ul className="space-y-1 text-sm text-muted-foreground ml-6 list-disc">
              <li>Use @ to tag friends in expenses</li>
              <li>Use # to associate expenses with groups</li>
              <li>Currencies are auto-detected</li>
              <li>Type "with everyone" to include all group members</li>
            </ul>
          </section>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface CommandItemProps {
  command: string;
  description: string;
  example: string;
}

function CommandItem({ command, description, example }: CommandItemProps) {
  return (
    <li className="bg-secondary/20 rounded-md p-2">
      <div className="font-mono text-xs">{command}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
      <div className="text-xs italic mt-1 text-muted-foreground">Example: {example}</div>
    </li>
  );
} 