import { useEffect } from "react";

export default function Timer({ timeRemaining, dispatch }) {
  const min = Math.floor(timeRemaining / 60);
  const sec = timeRemaining % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{sec < 10 && "0"}
      {sec}
    </div>
  );
}
