import { load } from '@tauri-apps/plugin-store';

const IS_TAURI = !!window.__TAURI_INTERNALS__;

let store;

const getStore = async () => {
  if (!IS_TAURI) return null;
  if (!store) {
    store = await load('settings.json', { autoSave: true });
  }
  return store;
};

export const storage = {
  getItem: async (key) => {
    if (IS_TAURI) {
      const s = await getStore();
      return s.get(key);
    }
    return localStorage.getItem(key);
  },
  setItem: async (key, value) => {
    if (IS_TAURI) {
      const s = await getStore();
      await s.set(key, value);
      await s.save();
    } else {
      localStorage.setItem(key, value);
    }
  },
  removeItem: async (key) => {
    if (IS_TAURI) {
      const s = await getStore();
      await s.delete(key);
      await s.save();
    } else {
      localStorage.removeItem(key);
    }
  },
};
