import React from 'react';
import { FiPlus } from 'react-icons/fi';

interface QuickActionProps {
  activeGroup: string | null;
  groups: { id: string; name: string }[];
  onSwitchGroup: (groupId: string | null) => void;
  onCreateGroup: () => void;
}

export function QuickAction({ activeGroup, groups, onSwitchGroup, onCreateGroup }: QuickActionProps) {
  return (
    <div className="flex overflow-x-auto py-2 px-3 bg-background/80 border-b scrollbar-hide">
      <div className="flex space-x-2 min-w-full pb-1">
        <ActionButton
          active={activeGroup === null}
          onClick={() => onSwitchGroup(null)}
        >
          All
        </ActionButton>

        {groups.map((group) => (
          <ActionButton
            key={group.id}
            active={activeGroup === group.id}
            onClick={() => onSwitchGroup(group.id)}
          >
            #{group.name}
          </ActionButton>
        ))}

        <ActionButton
          onClick={onCreateGroup}
          className="bg-accent/20 hover:bg-accent/30 text-accent-foreground"
        >
          <FiPlus className="h-3 w-3 mr-1" />
          New Group
        </ActionButton>
      </div>
    </div>
  );
}

interface ActionButtonProps {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
  className?: string;
}

export function ActionButton({ children, active, onClick, className }: ActionButtonProps) {
  return (
    <button
      type="button"
      className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap flex items-center transition-colors ${active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary/40 hover:bg-secondary/60"
        } ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
} 