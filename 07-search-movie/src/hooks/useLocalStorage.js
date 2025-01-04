import { useState, useEffect } from "react";

export function useLocalStorage(initialState, key) {
  // INITIAL STATE ONLY ON INITIAL RENDER, NOT EVERY RENDER
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // DON'T DO THIS: THIS WOULD UPDATE STATE ON EVERY RENDER
  // const [watchedMovies, setWatchedMovies] = useState(localStorage.getItem("watchedMovies"));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
