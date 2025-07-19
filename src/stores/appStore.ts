import { create } from 'zustand';
import { themes, type Theme } from '../config/themes.config';
import { IFeature } from '../types/features';

interface AppState {
  features: IFeature[];
  featureFlags: string[];
  setFeatures: (data: IFeature[]) => void;
  setFeatureFlags: (data: string[]) => void;
  resetFeatures: () => void;
  /**
   * If we decide to go with different themes for different users below props can be utilized
   */
  currentTheme: Theme;
  setTheme: (themeName: keyof typeof themes) => void;
}

const initialState = {
  features: [],
  featureFlags: [],
  currentTheme: themes.admin,
};

export const useAppStore = create<AppState>(set => ({
  ...initialState,
  setFeatures: data => {
    const newData = data.sort((a, b) =>
      a.featureName.localeCompare(b.featureName),
    );
    set(state => ({
      features: [...newData],
    }));
  },
  setFeatureFlags: (data: string[]) => {
    set(state => ({
      featureFlags: [...data],
    }));
  },
  setTheme: themeName => set({ currentTheme: themes[themeName] }),
  resetFeatures: () => set(initialState),
}));
