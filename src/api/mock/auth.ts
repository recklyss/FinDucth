import { User } from '../../types';

const MOCK_USER: User = {
  userId: 'u123456',
  name: 'John Doe',
  email: 'john@example.com',
  preferredCurrency: 'USD',
};

const MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1MTIzNDU2IiwiaWF0IjoxNjE0NTI2MjM1LCJleHAiOjE2MTQ2MTI2MzV9.example_token';

export const mockAuthApi = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (email === 'john@example.com' && password === 'password') {
      return { user: MOCK_USER, token: MOCK_TOKEN };
    }
    throw new Error('Invalid credentials');
  },

  register: async (email: string, password: string, name: string, preferredCurrency: string): Promise<{ user: User; token: string }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (email && password && name) {
      const newUser: User = {
        userId: 'u' + Math.floor(Math.random() * 1000000),
        name,
        email,
        preferredCurrency: preferredCurrency || 'USD',
      };

      return { user: newUser, token: MOCK_TOKEN };
    }
    throw new Error('Invalid registration data');
  },

  refreshToken: async (): Promise<{ token: string }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return { token: MOCK_TOKEN };
  },

  getCurrentUser: async (): Promise<User> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return MOCK_USER;
  },
}; 