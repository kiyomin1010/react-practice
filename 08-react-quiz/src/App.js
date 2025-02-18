import { useEffect, useReducer } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Start from "./components/Start";
import Question from "./components/Question";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Result from "./components/Result";

const initialState = {
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  status: "loading", // loading, error, ready, active, finished
  timeRemaining: null,
};

function reducer(state, action) {
  const TIME_PER_QUESTION = 30;

  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        timeRemaining: state.questions.length * TIME_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        highscore: state.highscore,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining <= 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [
    { questions, index, answer, points, highscore, status, timeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const questionCount = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Start questionCount={questionCount} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              questionCount={questionCount}
              points={points}
              maxPoints={maxPoints}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer timeRemaining={timeRemaining} dispatch={dispatch} />
              <NextButton
                index={index}
                questionCount={questionCount}
                answer={answer}
                dispatch={dispatch}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Result
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
