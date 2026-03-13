import AsyncStorage from '@react-native-async-storage/async-storage';

export const Storage = {
  // Save value
  set: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('Storage set error:', error);
    }
  },

  // Get value
  get: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.log('Storage get error:', error);
      return null;
    }
  },

  // Remove value
  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log('Storage remove error:', error);
    }
  },

  // Clear all
  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log('Storage clear error:', error);
    }
  },
};
