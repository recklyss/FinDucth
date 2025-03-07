import { useState, useEffect, useCallback } from 'react';
import { ChatMessage, ProcessCommandResponse } from '../types';
import { mockCommandApi } from '../api/mock/commands';
import { mockDataStore } from '../api/mock/dataStore';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  // Load initial messages
  useEffect(() => {
    setMessages(mockDataStore.messages);
  }, []);

  // Filter messages by active group
  const filteredMessages = activeGroup
    ? messages.filter(msg => !msg.groupId || msg.groupId === activeGroup)
    : messages;

  // Send a message to the chat
  const sendMessage = useCallback(async (content: string) => {
    // Create a new outgoing message
    const newMessage: ChatMessage = {
      id: 'm' + Math.floor(Math.random() * 1000000),
      type: 'OUTGOING',
      sender: 'You',
      content,
      timestamp: new Date().toISOString(),
      groupId: activeGroup || undefined,
    };

    // Add message to state
    setMessages(prev => [...prev, newMessage]);
    mockDataStore.messages.push(newMessage);

    // If message starts with /, process it as a command
    if (content.startsWith('/')) {
      setLoading(true);
      try {
        const response = await mockCommandApi.processCommand(content);
        handleCommandResponse(response);
      } catch (error) {
        console.error('Error processing command:', error);

        // Add error message
        const errorMessage: ChatMessage = {
          id: 'm' + Math.floor(Math.random() * 1000000),
          type: 'INCOMING',
          sender: 'FinDutch AI',
          content: 'Sorry, there was an error processing your command.',
          timestamp: new Date().toISOString(),
          groupId: activeGroup || undefined,
        };

        setMessages(prev => [...prev, errorMessage]);
        mockDataStore.messages.push(errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      // Simple response for non-command messages
      setLoading(true);

      // Simulate delay
      setTimeout(() => {
        const responseMessage: ChatMessage = {
          id: 'm' + Math.floor(Math.random() * 1000000),
          type: 'INCOMING',
          sender: 'FinDutch AI',
          content: getRandomResponse(content),
          timestamp: new Date().toISOString(),
          groupId: activeGroup || undefined,
        };

        setMessages(prev => [...prev, responseMessage]);
        mockDataStore.messages.push(responseMessage);
        setLoading(false);
      }, 800);
    }
  }, [activeGroup]);

  // Handle command response
  const handleCommandResponse = useCallback((response: ProcessCommandResponse) => {
    let content = response.message;
    let expenseCard = undefined;

    // Create expense card data if expense details are provided
    if (response.expenseDetails) {
      expenseCard = {
        title: response.expenseDetails.description || 'Expense',
        amount: response.expenseDetails.amount,
        currency: response.expenseDetails.currency,
        paidBy: response.expenseDetails.paidByName || 'You',
        splitMethod: response.expenseDetails.splitMethod,
        participants: response.expenseDetails.participants,
      };
    }

    // If group created and no active group, set it as active
    if (response.responseType === 'GROUP_CREATED' && response.groupId && !activeGroup) {
      setActiveGroup(response.groupId);
    }

    // Create response message
    const responseMessage: ChatMessage = {
      id: 'm' + Math.floor(Math.random() * 1000000),
      type: 'INCOMING',
      sender: 'FinDutch AI',
      content,
      timestamp: new Date().toISOString(),
      groupId: activeGroup || (response.groupId ? response.groupId : undefined),
      expenseCard,
    };

    setMessages(prev => [...prev, responseMessage]);
    mockDataStore.messages.push(responseMessage);
  }, [activeGroup]);

  // Get a list of available groups
  const groups = mockDataStore.groups.map(group => ({
    id: group.groupId,
    name: group.name,
  }));

  // Switch to a different group
  const switchGroup = useCallback((groupId: string | null) => {
    setActiveGroup(groupId);
  }, []);

  return {
    messages: filteredMessages,
    loading,
    sendMessage,
    activeGroup,
    switchGroup,
    groups,
  };
}

// Helper function to generate random responses for non-command messages
function getRandomResponse(message: string): string {
  const responses = [
    "I'm designed to help with expense splitting. Try using commands like /record or /group to interact with me!",
    "That's interesting! If you want to record an expense, try a command like '/record I paid 30 USD for dinner with @Alice'.",
    "I'm your expense assistant! Use commands starting with '/' to track expenses and manage groups.",
    "Hi there! I can help you split bills. Try '/help' to see available commands.",
  ];

  return responses[Math.floor(Math.random() * responses.length)];
} 