import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

interface GroupSelectorProps {
  onGroupSelect: (group: string) => void;
  className?: string;
}

export function GroupSelector({ onGroupSelect, className }: GroupSelectorProps) {
  const [activeGroup, setActiveGroup] = useState('All');

  const groups = [
    'All',
    '#TokyoTrip',
    '#RoommateExpenses',
    '#FamilyDinner'
  ];

  const handleGroupSelect = (group: string) => {
    setActiveGroup(group);
    onGroupSelect(group);
  };

  return (
    <div className={`flex overflow-x-auto py-3 px-2 gap-2 bg-secondary border-b border-accent/30 whitespace-nowrap scrollbar-hide ${className}`}>
      {groups.map((group, index) => (
        <button
          key={index}
          className={`px-3 py-2 rounded-2xl text-sm transition-all ${activeGroup === group
              ? 'bg-gradient-to-r from-accent to-accent/90 text-white font-medium shadow-md'
              : 'bg-background/60 border border-accent/30 hover:bg-accent hover:text-white'
            }`}
          onClick={() => handleGroupSelect(group)}
        >
          {group}
        </button>
      ))}

      <button
        className="px-3 py-2 rounded-2xl text-sm bg-background/60 border border-accent/30 hover:bg-accent hover:text-white transition-all"
        onClick={() => {/* Create new group functionality */ }}
      >
        <FaPlus className="inline mr-1" /> New Group
      </button>
    </div>
  );
} 