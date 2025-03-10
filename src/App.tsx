import { useState, useEffect } from "react";
import "./App.css";
import questions from "./data/questions.json";
import AnswerSet from "./components/AnswerSet";

function App() {
  const [outcome, setOutcome] = useState<boolean>(false);
  const [numCorrect, setNumCorrect] = useState<number>(0);
  const [curQuestion, setCurQuestion] = useState<number>(0);

  const setColors = () => {
    if (numCorrect === 0) {
      return "none-correct";
    } else if (numCorrect === questions[curQuestion].answers.length) {
      return "all-correct";
    } else {
      return "some-correct";
    }
  };

  useEffect(() => {
    if (numCorrect === questions[curQuestion].answers.length) {
      setOutcome(true);
    } else {
      setOutcome(false);
    }
  }, [numCorrect, curQuestion]);

  function handleNextQuestion() {
    const index = curQuestion + 1;
    setCurQuestion(index);
    setOutcome(false);
    setNumCorrect(0);
  }

  return (
    <div
      className={`flex flex-col items-center font-semibold justify-center h-screen ${setColors()}`}
    >
      <h3 className="text-2xl m-4">{questions[curQuestion].question}</h3>
      <div id="answers_container">
        {questions[curQuestion].answers.map((answerArr, index) => {
          return (
            <AnswerSet
              answerArr={answerArr}
              answerSetIndex={index}
              numCorrect={numCorrect}
              setNumCorrect={setNumCorrect}
              outcome={outcome}
              key={`pair-${index}`}
            />
          );
        })}
      </div>
      <p className="text-xl m-4">
        The answer is {outcome ? "correct" : " incorrect"}
      </p>
      {outcome ? (
        <button onClick={handleNextQuestion}>Next question</button>
      ) : null}
    </div>
  );
}

export default App;
