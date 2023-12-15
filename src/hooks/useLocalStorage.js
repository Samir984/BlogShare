import { useEffect, useState } from "react";

function useLocalStorage(initialState, key) {
  const [value, setValue] = useState(() => {
    const storeValue = localStorage.getItem(key);
    console.log(storeValue);
    return storeValue ? JSON.parse(storeValue) : { themeMode: initialState };
  });

  useEffect(() => {
    console.log(JSON.stringify(value), "e");
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export default useLocalStorage;
