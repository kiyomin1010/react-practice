import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    function eventListener(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }

    document.addEventListener("keydown", eventListener);

    return () => {
      document.removeEventListener("keydown", eventListener);
    };
  }, [key, action]);
}
