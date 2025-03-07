import { useState, useEffect } from "react";
import "./App.css";

const question = "An animal cell contains:";
const answers = [
  [
    { text: "Cell wall", correct: false },
    { text: "Ribosomes", correct: true },
  ],
  [
    { text: "Cytoplasm", correct: true },
    { text: "Chloroplast", correct: false },
  ],
  [
    { text: "Partially permeable membrane", correct: true },
    { text: "Impermeable membrane", correct: false },
  ],
  [
    { text: "Cellulose", correct: false },
    { text: "Mitochondira", correct: true },
  ],
];

const defaults = [1, 1, 1, 0];

function AnswerSet({
  answerArr,
  setIndex,
  numCorrect,
  setNumCorrect,
  outcome,
}) {
  const [selectedIndex, setSelectedIndex] = useState<number>(
    defaults[setIndex]
  );

  function handleChange(answerObj) {
    // If all answers are correct, prevent further changes
    if (!outcome) {
      let newIndex = selectedIndex + 1;
      let currentCorrect = numCorrect;

      if (newIndex > answerArr.length - 1) {
        newIndex = 0;
      }

      setSelectedIndex(newIndex);

      // Check whether the new selected answer correct
      if (answerObj.correct) {
        currentCorrect++;
      } else {
        currentCorrect--;
      }

      setNumCorrect(currentCorrect);
    }
  }

  return (
    <div className="flex justify-between border rounded-full m-2">
      {answerArr.map((answerObj, index) => {
        if (index === selectedIndex) {
          return (
            <span
              onClick={() => handleChange(answerObj)}
              key={`obj-${index}`}
              className="border rounded-full p-4 text-center w-1/2"
            >
              <p>{answerObj.text}</p>
            </span>
          );
        } else {
          return (
            <span
              onClick={() => handleChange(answerObj)}
              className="p-4 text-center w-1/2"
              key={`obj-${index}`}
            >
              <p>{answerObj.text}</p>
            </span>
          );
        }
      })}
    </div>
  );
}

function App() {
  const [outcome, setOutcome] = useState<boolean>(false);
  const [numCorrect, setNumCorrect] = useState<number>(1);

  useEffect(() => {
    if (numCorrect === answers.length) {
      setOutcome(true);
    }
  }, [numCorrect]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h3 className="text-2xl m-4">{question}</h3>
      <div id="answers_container">
        {answers.map((answerArr, index) => {
          return (
            <AnswerSet
              answerArr={answerArr}
              setIndex={index}
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
    </div>
  );
}

export default App;
