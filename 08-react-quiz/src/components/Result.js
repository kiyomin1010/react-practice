export default function Result({ points, maxPoints, highscore }) {
  const percentage = (points / maxPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 80) emoji = "🥉";
  if (percentage >= 25 && percentage < 50) emoji = "😢";
  if (percentage >= 0 && percentage < 25) emoji = "😱";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong> out of{" "}
        {maxPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
    </>
  );
}
