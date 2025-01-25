import { useState } from "react";

export default function DateCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  function increaseCount() {
    setCount((count) => count + step);
  }

  function decreaseCount() {
    setCount((count) => count - step);
  }

  function resetAll() {
    setCount(0);
    setStep(1);
  }

  const date = new Date("2025-01-25");

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) => {
            setStep(Number(e.target.value));
          }}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={decreaseCount}>-</button>
        <input
          value={count}
          onChange={(e) => {
            setCount(Number(e.target.value));
          }}
        />
        <button onClick={increaseCount}>+</button>
      </div>

      <p>{date.toLocaleDateString()}</p>

      <div>
        <button onClick={resetAll}>Reset</button>
      </div>
    </div>
  );
}
