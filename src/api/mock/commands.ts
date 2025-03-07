import { CommandSuggestion, ProcessCommandResponse, Expense } from '../../types';
import { mockDataStore } from './dataStore';

export const mockCommandApi = {
  processCommand: async (command: string, timezone: string = 'UTC'): Promise<ProcessCommandResponse> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Process /group command
    if (command.startsWith('/group create')) {
      const groupName = command.split('#')[1]?.trim();
      if (!groupName) {
        return {
          responseType: 'ERROR',
          message: 'Please provide a group name. Example: /group create #TripName',
        };
      }

      const groupId = 'g' + Math.floor(Math.random() * 1000000);
      const newGroup = {
        groupId,
        name: groupName,
        defaultCurrency: 'USD',
        createdBy: 'u123456',
        createdAt: new Date().toISOString(),
        members: [
          {
            userId: 'u123456',
            username: 'John Doe',
            role: 'ADMIN',
          },
        ],
      };

      mockDataStore.groups.push(newGroup);

      return {
        responseType: 'GROUP_CREATED',
        message: `Group #${groupName} has been created successfully. You can add friends to this group by using the /add_friend command.`,
        groupId,
        groupDetails: newGroup,
      };
    }

    // Process /add_friend command
    else if (command.startsWith('/add_friend')) {
      const friendNames = command.match(/@(\w+)/g);
      if (!friendNames || friendNames.length === 0) {
        return {
          responseType: 'ERROR',
          message: 'Please specify friends to add. Example: /add_friend @Alice @Bob',
        };
      }

      const friendsAdded = friendNames.map(name => name.substring(1));

      return {
        responseType: 'FRIENDS_ADDED',
        message: `Friends added to your contacts. Would you like to add them to a group?`,
      };
    }

    // Process /record command
    else if (command.startsWith('/record')) {
      // Extract amount
      const amountMatch = command.match(/(\d+)\s*([A-Z]{3})/);
      let amount = 0;
      let currency = 'USD';

      if (amountMatch) {
        amount = parseInt(amountMatch[1], 10);
        currency = amountMatch[2];
      } else {
        // Look for "I paid X for"
        const paidMatch = command.match(/paid\s*(\d+)\s*([A-Z]{3})/);
        if (paidMatch) {
          amount = parseInt(paidMatch[1], 10);
          currency = paidMatch[2];
        }
      }

      // Extract description
      let description = '';
      if (command.includes('for')) {
        description = command.split('for')[1].split('with')[0].trim();
      }

      // Extract group
      let groupId = '';
      let groupName = '';
      const groupMatch = command.match(/#(\w+)/);
      if (groupMatch) {
        groupName = groupMatch[1];
        const group = mockDataStore.groups.find(g => g.name.toLowerCase() === groupName.toLowerCase());
        if (group) {
          groupId = group.groupId;
        } else {
          // Create a new group if it doesn't exist
          groupId = 'g' + Math.floor(Math.random() * 1000000);
          mockDataStore.groups.push({
            groupId,
            name: groupName,
            defaultCurrency: currency,
            createdBy: 'u123456',
            createdAt: new Date().toISOString(),
            members: [
              {
                userId: 'u123456',
                username: 'John Doe',
                role: 'ADMIN',
              },
            ],
          });
        }
      }

      // Extract participants
      const participants = (command.match(/@(\w+)/g) || []).map(p => p.substring(1));
      if (!participants.includes('John')) {
        participants.push('John'); // Always include the current user
      }

      // Calculate split amount
      const splitAmount = parseFloat((amount / participants.length).toFixed(2));

      // Create expense
      const expenseId = 'e' + Math.floor(Math.random() * 1000000);
      const newExpense: Expense = {
        expenseId,
        description,
        amount,
        currency,
        paidBy: 'u123456',
        paidByName: 'John Doe',
        date: new Date().toISOString(),
        groupId,
        groupName,
        splitMethod: 'EQUAL',
        participants: participants.map(name => ({
          userId: name === 'John' ? 'u123456' : 'u' + Math.floor(Math.random() * 1000000),
          username: name,
          amount: splitAmount,
        })),
      };

      mockDataStore.expenses.push(newExpense);

      return {
        responseType: 'EXPENSE_RECORDED',
        message: `Expense recorded! Each person owes you ${splitAmount} ${currency}.`,
        expenseId,
        expenseDetails: newExpense,
      };
    }

    // Process /finalize command
    else if (command.startsWith('/finalize')) {
      const groupMatch = command.match(/#(\w+)/);
      if (!groupMatch) {
        return {
          responseType: 'ERROR',
          message: 'Please specify a group to finalize. Example: /finalize #TripName',
        };
      }

      const groupName = groupMatch[1];
      return {
        responseType: 'GROUP_FINALIZED',
        message: `Here's the final settlement for #${groupName}.`,
      };
    }

    // Default response for unknown commands
    return {
      responseType: 'UNKNOWN_COMMAND',
      message: "I didn't understand that command. Try /help to see available commands.",
    };
  },

  getSuggestions: async (partialCommand: string): Promise<CommandSuggestion[]> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    const suggestions: CommandSuggestion[] = [
      { command: '/record', description: 'Record a new expense' },
      { command: '/group create', description: 'Create a new group' },
      { command: '/add_friend', description: 'Add friends to your contacts' },
      { command: '/finalize', description: 'Finalize and settle up expenses' },
      { command: '/help', description: 'Show available commands' },
    ];

    return suggestions.filter(s => s.command.startsWith(partialCommand));
  },
}; 