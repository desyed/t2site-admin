import localforage from 'localforage';
import { createJSONStorage } from 'zustand/middleware';

export const zustantPersistorLocalforage = createJSONStorage(() => ({
  getItem: async (name) => {
    return await localforage.getItem(name);
  },
  setItem: async (name, value) => {
    return await localforage.setItem(name, value);
  },
  removeItem: async (name) => {
    return await localforage.removeItem(name);
  },
}));
