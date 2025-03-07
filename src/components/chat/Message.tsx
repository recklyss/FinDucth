import React from 'react';
import { ChatMessage } from '../../types';
import { ExpenseCard } from './ExpenseCard';
import { format } from 'date-fns';

interface MessageProps {
  message: ChatMessage;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const { type, sender, content, timestamp, expenseCard, groupId } = message;

  const formattedTime = timestamp
    ? format(new Date(timestamp), 'h:mm a')
    : '';

  if (type === 'SYSTEM') {
    return (
      <div className="system-message">
        {groupId && <span className="group-indicator">#{groupId.substring(1)}</span>}
        {content}
      </div>
    );
  }

  const messageClasses = type === 'OUTGOING'
    ? 'message outgoing'
    : 'message incoming';

  return (
    <div className={messageClasses}>
      <div className="message-header">
        <span className="message-user">{sender}</span>
        <span className="message-time">{formattedTime}</span>
      </div>

      <div className="message-content">
        {groupId && <span className="group-indicator">#{groupId.substring(1)}</span>}
        {content}
      </div>

      {expenseCard && <ExpenseCard data={expenseCard} />}
    </div>
  );
}; 