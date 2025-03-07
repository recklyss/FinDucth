import { Expense, Group, Friend, FriendRequest, ChatMessage } from '../../types';

// Mock data store to simulate a backend database
interface MockDataStore {
  groups: Group[];
  expenses: Expense[];
  friends: Friend[];
  friendRequests: FriendRequest[];
  messages: ChatMessage[];
}

export const mockDataStore: MockDataStore = {
  groups: [
    {
      groupId: 'g345678',
      name: 'TokyoTrip',
      defaultCurrency: 'JPY',
      createdBy: 'u123456',
      createdAt: '2025-03-03T10:16:00Z',
      members: [
        {
          userId: 'u123456',
          username: 'John Doe',
          role: 'ADMIN',
        },
        {
          userId: 'u234567',
          username: 'Alice',
          role: 'MEMBER',
        },
        {
          userId: 'u345678',
          username: 'Bob',
          role: 'MEMBER',
        },
      ],
    },
    {
      groupId: 'g456789',
      name: 'Apartment',
      defaultCurrency: 'USD',
      createdBy: 'u123456',
      createdAt: '2025-02-15T08:30:00Z',
      members: [
        {
          userId: 'u123456',
          username: 'John Doe',
          role: 'ADMIN',
        },
        {
          userId: 'u234567',
          username: 'Alice',
          role: 'MEMBER',
        },
      ],
    },
  ],

  expenses: [
    {
      expenseId: 'e789012',
      description: 'Dinner',
      amount: 2000,
      currency: 'JPY',
      paidBy: 'u123456',
      paidByName: 'John Doe',
      date: '2025-03-03T10:21:00Z',
      groupId: 'g345678',
      groupName: 'TokyoTrip',
      splitMethod: 'EQUAL',
      participants: [
        { userId: 'u123456', username: 'John Doe', amount: 666.67 },
        { userId: 'u234567', username: 'Alice', amount: 666.67 },
        { userId: 'u345678', username: 'Bob', amount: 666.67 },
      ],
    },
    {
      expenseId: 'e890123',
      description: 'Rent',
      amount: 1500,
      currency: 'USD',
      paidBy: 'u123456',
      paidByName: 'John Doe',
      date: '2025-02-28T09:00:00Z',
      groupId: 'g456789',
      groupName: 'Apartment',
      splitMethod: 'EQUAL',
      participants: [
        { userId: 'u123456', username: 'John Doe', amount: 750 },
        { userId: 'u234567', username: 'Alice', amount: 750 },
      ],
    },
  ],

  friends: [
    {
      userId: 'u234567',
      username: 'Alice',
      email: 'alice@example.com',
    },
    {
      userId: 'u345678',
      username: 'Bob',
      email: 'bob@example.com',
    },
    {
      userId: 'u456789',
      username: 'Charlie',
      email: 'charlie@example.com',
    },
  ],

  friendRequests: [
    {
      requestId: 'fr123456',
      status: 'PENDING',
      from: {
        userId: 'u567890',
        username: 'David',
      },
      timestamp: '2025-03-01T14:25:00Z',
    },
  ],

  messages: [
    {
      id: 'm123456',
      type: 'SYSTEM',
      sender: 'system',
      content: 'Welcome to FinDutch! Your AI expense splitting assistant.',
      timestamp: '2025-03-03T10:00:00Z',
    },
    {
      id: 'm234567',
      type: 'INCOMING',
      sender: 'FinDutch AI',
      content: 'Hi John! How can I help you manage your expenses today?',
      timestamp: '2025-03-03T10:00:10Z',
    },
  ],
}; 