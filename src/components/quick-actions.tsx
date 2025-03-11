import React from 'react';
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { FiPlus } from "react-icons/fi";
import { BsCreditCard, BsStars } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function QuickAction({ icon, label, onClick }: QuickActionProps) {
  return (
    <Button
      variant="outline"
      className="flex flex-col p-4 h-auto"
      onClick={onClick}
    >
      <div className="mb-2">{icon}</div>
      {label}
    </Button>
  );
}

export function QuickActions() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="sm">
          <FiPlus className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="py-4">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <QuickAction
              icon={<BsCreditCard className="h-6 w-6" />}
              label="Add Expense"
            />
            <QuickAction
              icon={<BsStars className="h-6 w-6" />}
              label="Split Bill"
            />
            <QuickAction
              icon={<FaUsers className="h-6 w-6" />}
              label="Add Friend"
            />
            <QuickAction
              icon={<FaDollarSign className="h-6 w-6" />}
              label="Settle Up"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 