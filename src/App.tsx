import { useState, useEffect, useRef } from "react";
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
  const [translationX, setTranslationX] = useState<string>("");
  const [translationY, setTranslationY] = useState<string>("");
  const containerRef = useRef<HTMLDivElement | null>(null); // Reference to the container

  useEffect(() => {
    function updateTranslation() {
      // Larger screens use X-axis
      if (window.innerWidth > 640) {
        // We need to check if containerRef.current exists to perform the calculation
        // Or we get a TS error
        if (containerRef.current) {
          if (selectedIndex === 0) {
            setTranslationX(`translateX(0px)`);
            setTranslationY(`translateY(0px)`);
          } else {
            setTranslationX(
              `translateX(${
                containerRef.current.offsetWidth / answerArr.length
              }px)`
            );
            setTranslationY(`translateY(0px)`);
          }
        }
      } else {
        if (containerRef.current) {
          if (selectedIndex === 0) {
            setTranslationY(`translateY(0px)`);
            setTranslationX(`translateX(0px)`);
          } else {
            setTranslationY(
              `translateY(${
                containerRef.current.offsetHeight / answerArr.length
              }px)`
            );
            setTranslationX(`translateX(0px)`);
          }
        }
      }
    }
    updateTranslation();
    // Listen for window resize
    window.addEventListener("resize", updateTranslation);
    return () => window.removeEventListener("resize", updateTranslation);
  }, [answerArr.length, selectedIndex]);

  const width = `w-1/${answerArr.length}`;
  const height = `h-1/${answerArr.length}`;

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

  return (
    <div
      ref={containerRef}
      className={`flex sm:flex-row flex-col relative items-center border rounded-lg sm:rounded-full m-2 h-min sm:h-18 w-2xs sm:w-xl md:w-2xl text-sm sm:text-base`}
    >
      <span
        id="overlay"
        className={`border border-transparent sm:rounded-full ${height} rounded-lg sm:h-18 w-2xs sm:w-1/2 transition-transform duration-700 selected-bg absolute z-10`}
        style={{
          transform: `${translationX} ${translationY}`,
        }}
      ></span>
      {answerArr.map((answerObj, index) => {
        if (index === selectedIndex) {
          return (
            <span
              onClick={() => handleChange(answerObj, index)}
              key={`obj-${index}`}
              className={`sm:p-4 text-center w-1/2 cursor-pointer selected-text z-20`}
            >
              <p>{answerObj.text}</p>
            </span>
          );
        } else {
          return (
            <span
              onClick={() => handleChange(answerObj, index)}
              className={`sm:p-4 text-center w-1/2 cursor-pointer z-20`}
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

  const setColors = () => {
    if (numCorrect === 0) {
      return "none-correct";
    } else if (numCorrect === answers.length) {
      return "all-correct";
    } else {
      return "some-correct";
    }
  };

  useEffect(() => {
    if (numCorrect === answers.length) {
      setOutcome(true);
    }
  }, [numCorrect]);

  return (
    <div
      className={`flex flex-col items-center font-semibold justify-center h-screen ${setColors()}`}
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
