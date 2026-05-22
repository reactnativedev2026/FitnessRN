import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  USER_DATA: "USER_DATA",
 } as const;

// Save data
export const storeData = async <T>(value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("USER_DATA", jsonValue);
  } catch (error) {
    console.log("AsyncStorage Save Error:", error);
  }
};

// Get data
export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? (JSON.parse(jsonValue) as T) : null;
  } catch (error) {
    console.log("AsyncStorage Get Error:", error);
    return null;
  }
};

// Remove data
export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("AsyncStorage Remove Error:", error);
  }
};

// Clear all (optional but useful)
export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log("AsyncStorage Clear Error:", error);
  }
};
