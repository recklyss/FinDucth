import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Plus, DollarSign, Users, Calendar, Hash } from 'lucide-react';
import { FaPaperPlane } from 'react-icons/fa';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { HelpDialog } from './components/help-dialog';
import { AuthDialog } from './components/auth-dialog';

interface GroupInfo {
  id: string;
  name: string;
}

interface ExpenseData {
  amount: number;
  description: string;
  paidBy: string;
  splitWith: string[];
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  username: string;
  groupId?: string;
  expense?: ExpenseData;
}

interface Command {
  name: string;
  description: string;
  icon: React.ReactNode;
}

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m FinDutch, your financial assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date(),
      username: 'FinDutch AI'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentGroup, setCurrentGroup] = useState<string>('all');
  const [showingSuggestions, setShowingSuggestions] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const groups: GroupInfo[] = [
    { id: 'all', name: 'All' },
    { id: 'tokyo', name: 'TokyoTrip' },
    { id: 'roommates', name: 'RoommateExpenses' },
    { id: 'vacation', name: 'VacationFund' },
  ];

  const commands: Command[] = [
    { name: '/expense', description: 'Record a new expense', icon: <DollarSign size={16} /> },
    { name: '/group', description: 'Create a new group', icon: <Users size={16} /> },
    { name: '/friend', description: 'Add a new friend', icon: <User size={16} /> },
    { name: '/schedule', description: 'Schedule a payment', icon: <Calendar size={16} /> },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (inputValue.startsWith('/')) {
      setShowingSuggestions(true);
    } else {
      setShowingSuggestions(false);
    }
  }, [inputValue]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      username: 'You'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Process commands
    let responseText = '';
    let expenseData: ExpenseData | undefined = undefined;

    if (inputValue.startsWith('/expense')) {
      responseText = 'I\'ve recorded your expense. You can view it in the expenses tab.';
      expenseData = {
        amount: 29.99,
        description: 'Dinner at Sushi Place',
        paidBy: 'You',
        splitWith: ['Alex', 'Jordan']
      };
    } else if (inputValue.startsWith('/group')) {
      responseText = 'I\'ve created a new group called "Summer Trip". You can add members to it now.';
    } else if (inputValue.startsWith('/friend')) {
      responseText = 'I\'ve added Jordan to your friends list. You can now include them in expenses.';
    } else {
      responseText = 'I understand you want to chat about finances. How else can I assist you today?';
    }

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date(),
        username: 'FinDutch AI',
        expense: expenseData
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Header */}
      <header className="py-4 px-6 flex justify-between items-center shadow-md" style={{ backgroundColor: 'var(--primary)' }}>
        <h1 className="text-xl font-bold" style={{ color: 'var(--primary-foreground)' }}>FinDutch</h1>
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: 'var(--secondary)' }}>
          J
        </button>
      </header>

      {/* Group Selector */}
      <div className="p-3 overflow-x-auto" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="flex space-x-2">
          {groups.map((group) => (
            <button
              key={group.id}
              onClick={() => setCurrentGroup(group.id)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors`}
              style={{
                backgroundColor: currentGroup === group.id ? 'var(--accent)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white'
              }}
            >
              <Hash size={14} className="inline mr-1" />
              {group.name}
            </button>
          ))}
          <button className="p-2 rounded-full text-white/80 hover:bg-white/20"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className="max-w-[75%] rounded-lg px-4 py-3"
              style={{
                backgroundColor: message.sender === 'user' ? 'var(--primary)' : 'var(--bg-dark)',
                color: message.sender === 'user' ? 'var(--primary-foreground)' : 'var(--text-primary)'
              }}
            >
              <div className="text-xs opacity-70 mb-1">{message.username}</div>
              <div className="text-sm">{message.text}</div>

              {message.expense && (
                <div className="mt-2 p-2 rounded border text-xs"
                  style={{
                    backgroundColor: 'var(--bg-dark)',
                    borderColor: 'var(--border)'
                  }}>
                  <div className="font-semibold mb-1">Expense: {message.expense.description}</div>
                  <div>Amount: ${message.expense.amount}</div>
                  <div>Paid by: {message.expense.paidBy}</div>
                  <div>Split with: {message.expense.splitWith.join(', ')}</div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center animate-fade-in">
            <div className="rounded-lg px-4 py-3" style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-primary)' }}>
              <div className="text-xs opacity-70 mb-1">FinDutch AI</div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full animate-typing-1" style={{ backgroundColor: 'var(--primary)' }}></div>
                <div className="w-2 h-2 rounded-full animate-typing-2" style={{ backgroundColor: 'var(--primary)' }}></div>
                <div className="w-2 h-2 rounded-full animate-typing-3" style={{ backgroundColor: 'var(--primary)' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Command suggestions */}
      {showingSuggestions && (
        <div className="text-white p-3 mx-4 mb-2 rounded-lg animate-slide-in"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <div className="text-xs mb-2 text-white/70">Available commands:</div>
          <div className="grid grid-cols-2 gap-2">
            {commands.map((cmd) => (
              <div
                key={cmd.name}
                className="flex items-center space-x-2 p-1 hover:bg-white/10 rounded text-sm cursor-pointer"
                onClick={() => setInputValue(cmd.name)}
              >
                <div style={{ color: 'var(--primary)' }}>{cmd.icon}</div>
                <div>
                  <div className="font-medium">{cmd.name}</div>
                  <div className="text-xs text-white/60">{cmd.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="p-4 border-t" style={{
        backgroundColor: 'var(--bg)',
        borderColor: 'var(--border)'
      }}>
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message or command..."
            className="flex-1 rounded-full px-4 py-3 text-white focus:outline-none focus:ring-1"
            style={{
              backgroundColor: 'var(--bg-darker)',
              borderColor: 'transparent',
              boxShadow: 'none',
              color: 'var(--text-primary)',
              '--tw-ring-color': 'var(--primary)'
            } as React.CSSProperties}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="p-3 rounded-full"
            style={{
              backgroundColor: inputValue.trim() ? 'var(--primary)' : 'var(--bg-dark)',
              color: inputValue.trim() ? 'var(--primary-foreground)' : 'var(--text-secondary)'
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Help dialog */}
      <HelpDialog
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
      />

      {/* Auth dialog */}
      <AuthDialog
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode="login"
      />
    </div>
  );
}

export default App;
