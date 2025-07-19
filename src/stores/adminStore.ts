import { create } from 'zustand';

interface AdminState {
  isNavCollapsed: boolean;
  users: any[];
  settings: Record<string, any>;
  setNavCollapsed: (collapsed: boolean) => void;
  setUsers: (users: any[]) => void;
  setSettings: (settings: Record<string, any>) => void;
}

export const useAdminStore = create<AdminState>(set => ({
  isNavCollapsed: false,
  users: [],
  settings: {},
  setNavCollapsed: collapsed => set({ isNavCollapsed: collapsed }),
  setUsers: users => set({ users }),
  setSettings: settings => set({ settings }),
}));
