/*
 Using localStorage Without Hooks

 Not reactive — changes won’t automatically update the UI.

 Manual DOM manipulation — you need to use document.getElementById() and update the page manually.

Not declarative.

Using localStorage With React Hooks (useState, useEffect)
Reactive and declarative — UI updates automatically when the value changes.

Follows best practices — works naturally with React’s state system.

Scalable

Easy to combine with forms.
*/

//import hooks so custom hook is reactive and lifecycle-aware.
import { useState, useEffect } from 'react';


/*
We call useState() with a lazy initializer function (it runs only on the first render).

localStorage.getItem(key) gets the stored value (a string).

JSON.parse() turns that string back into a usable value.

If there's no value or an error occurs, we fall back to initialValue.

The state is saved in storedValue, and we can update it with setStoredValue.
*/

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

/*
This runs every time storedValue or key changes.

It saves the new state to localStorage, using JSON.stringify() to serialize it.

If something goes wrong (like storage quota limits), it logs a warning.



*/

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error writing localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch (error) {
          console.warn(`Error parsing localStorage key "${key}":`, error);
        }
      }
    };

/*
This listens for storage events — which only happen in other tabs.

If the event’s key matches the one we're using, it updates the current tab’s state with the new value.

This keeps all tabs in sync.

The cleanup function (return () => ...) removes the event listener when the component unmounts.
*/

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

/*
return [storedValue, setStoredValue] as const;
//such as:
const [name, setName] = useLocalStorage('name', '');

This returns the current value and the setter — just like useState.

as const ensures TypeScript infers this as a tuple ([value, setter]), not a general array.

*/

  return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
