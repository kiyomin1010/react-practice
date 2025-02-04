export default function Start({ questionCount }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>
        We have {questionCount} questions for testing your React knowledge
      </h3>
      <button className="btn btn-ui">Start</button>
    </div>
  );
}
