import { useCallback, useEffect, useState } from "react";

/**
 * useLocalStorage
 * A drop-in replacement for useState that transparently persists the value
 * to window.localStorage and keeps it in sync across browser tabs.
 *
 * @param {string} key         Storage key.
 * @param {*}      initialValue Default value (or a lazy initializer fn).
 * @returns {[any, Function, Function]} [value, setValue, removeValue]
 */
function readValue(key, initialValue) {
  if (typeof window === "undefined") {
    return initialValue instanceof Function ? initialValue() : initialValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }
  } catch (error) {
    console.warn(`useLocalStorage: could not read key "${key}"`, error);
  }
  return initialValue instanceof Function ? initialValue() : initialValue;
}

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() =>
    readValue(key, initialValue)
  );

  const setValue = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        try {
          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(next));
          }
        } catch (error) {
          console.warn(`useLocalStorage: could not write key "${key}"`, error);
        }
        return next;
      });
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`useLocalStorage: could not remove key "${key}"`, error);
    }
    setStoredValue(initialValue instanceof Function ? initialValue() : initialValue);
  }, [key, initialValue]);

  // Keep state synchronized when the same key changes in another tab.
  useEffect(() => {
    function handleStorage(event) {
      if (event.key === key) {
        setStoredValue(readValue(key, initialValue));
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
