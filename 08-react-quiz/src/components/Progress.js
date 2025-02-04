export default function Progress({ index, questionCount, points, maxPoints }) {
  return (
    <header className="progress">
      <progress value={index + 1} max={questionCount}></progress>
      <p>
        Question <strong>{index + 1}</strong> / {questionCount}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}
