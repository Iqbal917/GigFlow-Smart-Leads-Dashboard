import { create } from 'zustand';

import type { User } from '../types/auth.types';

interface AuthState {
  user: User | null;
  token: string | null;

  setAuth: (
    user: User,
    token: string
  ) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  let initialUser = null;
  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      initialUser = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error('Failed to parse user from localStorage');
  }

  return {
    user: initialUser,
    token: localStorage.getItem('token'),

    setAuth: (user, token) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      set({
        user,
        token
      });
    },

    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      set({
        user: null,
        token: null
      });
    }
  };
});