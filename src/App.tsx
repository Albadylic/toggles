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

  const width = `w-1/${answerArr.length}`;

  function handleChange(answerObj, index) {
    // If all answers are correct, prevent further changes
    if (!outcome) {
      let currentCorrect = numCorrect;

      setSelectedIndex(index);

      // Check if the answer is selected already
      if (selectedIndex != index) {
        // Check whether the new selected answer correct
        if (answerObj.correct) {
          currentCorrect++;
        } else {
          currentCorrect--;
        }
      }

      setNumCorrect(currentCorrect);
    }
  }

  function moveOverlay() {}

  return (
    <div
      className={`flex relative items-center border rounded-full m-2 h-18 w-full`}
    >
      <span
        id="overlay"
        className={`border border-transparent rounded-full w-1/2 h-18 transition-transform duration-700 selected-bg absolute`}
      ></span>
      {answerArr.map((answerObj, index) => {
        if (index === selectedIndex) {
          return (
            <span
              onClick={() => handleChange(answerObj, index)}
              key={`obj-${index}`}
              className={`p-4 text-center ${width} cursor-pointer selected-text`}
            >
              <p>{answerObj.text}</p>
            </span>
          );
        } else {
          return (
            <span
              onClick={() => handleChange(answerObj, index)}
              className={`p-4 text-center ${width} cursor-pointer`}
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

  const colourObject = {
    "0": "none-correct",
    "1": "some-correct",
    "2": "some-correct",
    "3": "some-correct",
    "4": "all-correct",
  };

  useEffect(() => {
    if (numCorrect === answers.length) {
      setOutcome(true);
    }
  }, [numCorrect]);

  return (
    <div
      className={`flex flex-col items-center font-semibold justify-center h-screen ${
        colourObject[numCorrect.toString()]
      }`}
    >
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
