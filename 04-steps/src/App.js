import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  // react hooks should be called on the top level of components
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  // use callback function when you update state based on current state
  function handlePrevious() {
    if (step > 1)
      setStep((currentStep) => {
        return currentStep - 1;
      });
  }

  function handleNext() {
    if (step < 3)
      setStep((currentStep) => {
        return currentStep + 1;
      });
  }

  return (
    <>
      <button
        className="close"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            STEP {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
