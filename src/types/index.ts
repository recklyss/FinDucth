export type User = {
  userId: string;
  name: string;
  email: string;
  preferredCurrency: string;
};

export type Friend = {
  userId: string;
  username: string;
  email: string;
};

export type FriendRequest = {
  requestId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  from?: {
    userId: string;
    username: string;
  };
  to?: {
    userId: string;
    username: string;
  };
  timestamp: string;
};

export type Group = {
  groupId: string;
  name: string;
  defaultCurrency: string;
  memberCount?: number;
  totalExpenses?: number;
  yourBalance?: number;
  createdBy?: string;
  createdAt?: string;
  members?: GroupMember[];
  expenses?: ExpenseSummary[];
  balances?: Balance[];
};

export type GroupMember = {
  userId: string;
  username: string;
  role: 'ADMIN' | 'MEMBER';
};

export type Balance = {
  userId: string;
  username: string;
  netBalance: number;
};

export type ExpenseSummary = {
  expenseId: string;
  description: string;
  amount: number;
  currency: string;
  paidBy: string;
  paidByName?: string;
  date: string;
};

export type Expense = ExpenseSummary & {
  groupId: string;
  groupName?: string;
  splitMethod: 'EQUAL' | 'EXACT' | 'PERCENTAGE' | 'SHARES';
  participants: ExpenseParticipant[];
  createdAt?: string;
  updatedAt?: string;
};

export type ExpenseParticipant = {
  userId: string;
  username: string;
  amount: number;
};

export type MessageType = 'INCOMING' | 'OUTGOING' | 'SYSTEM';

export type ExpenseCardData = {
  title: string;
  amount: number;
  currency: string;
  paidBy: string;
  splitMethod: string;
  participants: { userId: string; username: string; amount: number }[];
};

export type ChatMessage = {
  id: string;
  type: MessageType;
  sender: string;
  content: string;
  timestamp: string;
  groupId?: string;
  expenseCard?: ExpenseCardData;
  summaryCard?: any;
};

export type CommandSuggestion = {
  command: string;
  description: string;
};

export type ProcessCommandResponse = {
  responseType: string;
  message: string;
  expenseId?: string;
  expenseDetails?: Expense;
  groupId?: string;
  groupDetails?: Group;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}; 