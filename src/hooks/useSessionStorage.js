import React from 'react';

/**
 * Hook is working with session storage
 * if we have data in the local storage then we will get it
 * otherwise we will get clear state
 * @param keyName
 * @param defaultValue
 * @returns {[unknown,setValue]}
 */
const useSessionStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = React.useState(() => {
        try {
            const value = sessionStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value);
            } else {
                sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });
    // setup session storage new item
    const setValue = newValue => {
        try {
            sessionStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {}
        setStoredValue(newValue);
    };

    return [storedValue, setValue];
};

export default useSessionStorage;
