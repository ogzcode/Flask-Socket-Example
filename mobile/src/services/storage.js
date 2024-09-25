import AsyncStorage from "@react-native-async-storage/async-storage";


export const setItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    }
    catch (e) {
        console.error(e);
    }
}

export const getItem = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    }
    catch (e) {
        console.error(e);
    }
}

export const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    }
    catch (e) {
        console.error(e);
    }
}

export const clear = async () => {
    try {
        await AsyncStorage.clear();
    }
    catch (e) {
        console.error(e);
    }
}