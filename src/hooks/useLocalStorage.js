import { useState, useEffect } from 'react';

/**
 * Custom React hook to bind state with localStorage.
 * @param {string} key 
 * @param {any} initialValue 
 * @returns {[any, Function]}
 */
export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      
      // Notify other parts of the app that data has changed
      window.dispatchEvent(new Event('calendar-data-updated'));
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error);
    }
  };

  // Sync state if localStorage changes in another tab/window
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
        } catch (err) {
          console.error('Error syncing localStorage state:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue];
}
