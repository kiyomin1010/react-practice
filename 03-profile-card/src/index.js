import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";

const skills = [
  {
    skill: "HTML/CSS",
    level: "intermediate",
    color: "yellow",
  },
  {
    skill: "JavaScript",
    level: "intermediate",
    color: "orange",
  },
  {
    skill: "React",
    level: "intermediate",
    color: "blue",
  },
  {
    skill: "Vue",
    level: "beginner",
    color: "green",
  },
  {
    skill: "Express",
    level: "intermediate",
    color: "grey",
  },
  {
    skill: "C#",
    level: "intermediate",
    color: "lime",
  },
  {
    skill: "Unity",
    level: "intermediate",
    color: "white",
  },
  {
    skill: "PHP",
    level: "intermediate",
    color: "purple",
  },
  {
    skill: "Laravel",
    level: "intermediate",
    color: "fuchsia",
  },
  {
    skill: "Python",
    level: "beginner",
    color: "navy",
  },
];

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return <img className="avatar" src="./kiyomin.jpg" alt="kiyomin" />;
}

function Intro() {
  return (
    <div>
      <h1>KYOMIN KU</h1>
      <p>Developer working in Japan who is interested in Web, Game and AI.</p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <Skill skill={skill.skill} color={skill.color} level={skill.level} />
      ))}
    </div>
  );
}

function Skill({ skill, color, level }) {
  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <span>{skill}</span>
      <span>
        {level === "beginner" && "👶"}
        {level === "intermediate" && "👍"}
        {level === "advanced" && "💪"}
      </span>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
