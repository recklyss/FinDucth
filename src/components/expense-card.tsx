import React from 'react';

export interface ExpenseCardProps {
  title: string;
  amount: number;
  currency?: string;
  description?: string;
  date?: Date;
  participants?: { id: string; name: string; }[];
  className?: string;
}

export function ExpenseCard({
  title,
  amount,
  currency = 'USD',
  description,
  date,
  participants = [],
  className
}: ExpenseCardProps) {
  // Format the amount with the currency
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);

  // Generate initials for participants
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className={`bg-background rounded-xl p-4 mt-2 shadow-md hover:translate-y-[-2px] transition-all ${className}`}>
      <div className="flex justify-between items-center mb-3">
        <div className="font-medium">{title}</div>
        <div className="font-bold text-primary">{currency} {formattedAmount}</div>
      </div>

      {description && (
        <div className="text-sm text-foreground/80 mb-3 leading-relaxed">
          {description}
        </div>
      )}

      {date && (
        <div className="text-xs text-foreground/60 mb-2">
          {date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </div>
      )}

      {participants.length > 0 && (
        <div className="flex mt-3">
          {participants.map((participant, index) => (
            <div
              key={participant.id}
              className="w-8 h-8 rounded-full bg-background border-2 border-background flex items-center justify-center text-xs font-medium shadow-sm hover:transform hover:scale-110 hover:-translate-y-1 transition-all z-10"
              style={{ marginLeft: index > 0 ? '-8px' : '0', zIndex: participants.length - index }}
            >
              {getInitials(participant.name)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 