import React from 'react';
import { ExpenseCardData } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatCurrency } from '../../lib/utils';
import { FiDollarSign, FiUsers } from 'react-icons/fi';

interface ExpenseCardProps {
  data: ExpenseCardData;
}

export function ExpenseCard({ data }: ExpenseCardProps) {
  const { title, amount, currency, paidBy, participants } = data;

  const eachAmount = participants.length > 0
    ? amount / participants.length
    : amount;

  return (
    <Card className="mt-3 bg-background/95 border-border/50 shadow-sm overflow-hidden">
      <CardHeader className="p-3 pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-sm font-bold text-primary">
          {formatCurrency(amount)} {currency}
        </div>
      </CardHeader>

      <CardContent className="p-3 pt-0 space-y-2">
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center gap-1">
            <FiDollarSign className="h-3 w-3" />
            <span>Paid by: {paidBy}</span>
          </div>

          <div className="flex items-center gap-1">
            <FiUsers className="h-3 w-3" />
            <span>Split equally among: {participants.map(p => p.username).join(', ')}</span>
          </div>

          <div className="font-medium">
            Each person owes {paidBy}: {formatCurrency(eachAmount)} {currency}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {participants.map((participant, index) => (
            <div
              key={participant.userId}
              className={cn(
                "h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-white",
                participant.userId === data.paidBy ? "bg-success" : "bg-destructive"
              )}
            >
              {participant.username.charAt(0).toUpperCase()}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 