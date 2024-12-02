import AsyncStorage from '@react-native-async-storage/async-storage';

import { localDBsecret } from "../../app.json";

const store = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`${localDBsecret}@${key}`, jsonValue);
      return value
    } catch (e) {
      // saving error
      return false
    }
  };

const get = async (key) => {
    try {
      const value = await AsyncStorage.getItem(`${localDBsecret}@${key}`);
      if (value !== null) {
        return JSON.parse(value)
      }else return null
    } catch (e) {
      // error reading value
        return false
    }
};

const remove = async (key) => {
  try {
    const value = await AsyncStorage.removeItem(`${localDBsecret}@${key}`);
    if (value) {
      return true
    }else return false
  } catch (e) {
    // error reading value
      return false
  }
}

const localDB = {
    store,
    get,
    remove
}

export default localDB;