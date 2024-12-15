import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";

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
      <Skill skill="HTML/CSS" emoji="👍" color="yellow" />
      <Skill skill="JavaScript" emoji="👍" color="orange" />
      <Skill skill="React" emoji="👍" color="blue" />
      <Skill skill="Vue" emoji="👌" color="green" />
      <Skill skill="Express" emoji="👍" color="grey" />
      <Skill skill="C#" emoji="👍" color="lime" />
      <Skill skill="Unity" emoji="👍" color="white" />
      <Skill skill="PHP" emoji="👍" color="purple" />
      <Skill skill="Laravel" emoji="👍" color="fuchsia" />
      <Skill skill="Python" emoji="👌" color="navy" />
    </div>
  );
}

function Skill(props) {
  return (
    <div className="skill" style={{ backgroundColor: props.color }}>
      <span>{props.skill}</span>
      <span>{props.emoji}</span>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
