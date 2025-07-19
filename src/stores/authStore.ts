import { create } from 'zustand';
import type { AuthState, UserData } from '../types/auth';

// Helper function to get persisted state from localStorage
const getPersistedState = () => {
  try {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    const user = userStr ? (JSON.parse(userStr) as UserData) : null;
    return { token, user };
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return { token: null, user: null };
  }
};

export const useAuthStore = create<AuthState>(set => {
  // Get initial state from localStorage
  const { token, user } = getPersistedState();

  return {
    user,
    token,
    setUserData: data => {
      set({ user: { ...data.data }, token: data.data.access_token });
    },
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({
        user: null,
        token: null,
      });
    },
  };
});
