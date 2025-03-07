import React from 'react';
import { ExpenseCardData } from '../../types';

interface ExpenseCardProps {
  data: ExpenseCardData;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({ data }) => {
  const { title, amount, currency, paidBy, participants } = data;

  const formatAmount = (amt: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(amt);
  };

  const eachAmount = participants.length > 0
    ? amount / participants.length
    : amount;

  return (
    <div className="expense-card">
      <div className="expense-header">
        <div className="expense-title">{title}</div>
        <div className="expense-amount">{formatAmount(amount)} {currency}</div>
      </div>

      <div className="expense-details">
        <div>Paid by: {paidBy}</div>
        <div>
          Split equally among: {participants.map(p => p.username).join(', ')}
        </div>
        <div>Each person owes {paidBy}: {formatAmount(eachAmount)} {currency}</div>
      </div>

      <div className="expense-participants">
        {participants.map((participant, index) => (
          <div
            key={participant.userId}
            className="member"
            style={{
              backgroundColor: participant.userId === data.paidBy ? 'var(--success)' : 'var(--error)'
            }}
          >
            {participant.username.charAt(0).toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}; 