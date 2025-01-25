import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

// 상태 변경 로직은 전부 reducer 함수 내부에 위치한다
function reducer(state, action) {
  switch (action.type) {
    case "increase":
      return { ...state, count: state.count + state.step };
    case "decrease":
      return { ...state, count: state.count - state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}

export default function DateCounter() {
  // useReducer는 복잡한 상태를 관리할 때 주로 사용된다
  // 1. dispatch 함수가 reducer 함수에게 action을 전달한다
  // 2. reducer 함수가 새로운 상태를 리턴한다
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  function increaseCount() {
    dispatch({ type: "increase" });
  }

  function decreaseCount() {
    dispatch({ type: "decrease" });
  }

  function setCount(e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  }

  function setStep(e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  }

  function reset() {
    dispatch({ type: "reset" });
  }

  const date = new Date("2025-01-25");

  return (
    <div className="counter">
      <div>
        <input type="range" min="0" max="10" value={step} onChange={setStep} />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={decreaseCount}>-</button>
        <input value={count} onChange={setCount} />
        <button onClick={increaseCount}>+</button>
      </div>

      <p>{date.toLocaleDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
