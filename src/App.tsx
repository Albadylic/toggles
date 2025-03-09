import { useState, useEffect, useRef } from "react";
import "./App.css";
import questions from "./data/questions.json";

function AnswerSet({ answerArr, numCorrect, setNumCorrect, outcome }) {
  const randomIndex = Math.floor(Math.random() * answerArr.length);
  const [selectedIndex, setSelectedIndex] = useState<number>(randomIndex);
  const [translationDist, setTranslationDist] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const checkCorrect = (answerObj) => {
    console.log("before", numCorrect);
    if (answerObj.correct) {
      setNumCorrect((prev: number) => prev + 1);
    } else {
      setNumCorrect((prev: number) => prev - 1);
    }
    console.log("after", numCorrect);
  };

  useEffect(() => {
    setNumCorrect((prev: number) =>
      answerArr[randomIndex].correct ? prev + 1 : prev - 1
    );
  }, []);

  useEffect(() => {
    function updateTranslation() {
      if (containerRef.current) {
        setTranslationDist(containerRef.current.offsetWidth / answerArr.length);
      }
    }
    updateTranslation();
    window.addEventListener("resize", updateTranslation);
    return () => window.removeEventListener("resize", updateTranslation);
  }, [answerArr.length]);

  const width = `w-1/${answerArr.length}`;

  function handleChange(answerObj, index) {
    // If all answers are correct, prevent further changes
    if (!outcome) {
      // let currentCorrect = numCorrect;

      setSelectedIndex(index);

      // // Check if the answer is selected already
      // if (selectedIndex != index) {
      //   // Check whether the new selected answer correct
      //   // if (answerObj.correct) {
      //   //   currentCorrect++;
      //   // } else {
      //   //   currentCorrect--;
      //   // }
      //   checkCorrect(answerObj);
      // }
    }
  }

  return (
    <div
      ref={containerRef}
      className={`flex relative items-center border rounded-full m-2 h-18 w-full`}
    >
      <span
        id="overlay"
        className={`border border-transparent rounded-full ${width} h-18 transition-transform duration-700 selected-bg absolute z-10`}
        style={{
          transform:
            selectedIndex > 0
              ? `translateX(${translationDist}px)`
              : `translateX(0)`,
        }}
      ></span>
      {answerArr.map((answerObj, index) => {
        if (index === selectedIndex) {
          return (
            <span
              onClick={() => handleChange(answerObj, index)}
              key={`obj-${index}`}
              className={`p-4 text-center ${width} cursor-pointer selected-text z-20`}
            >
              <p>{answerObj.text}</p>
            </span>
          );
        } else {
          return (
            <span
              onClick={() => handleChange(answerObj, index)}
              className={`p-4 text-center ${width} cursor-pointer z-20`}
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
