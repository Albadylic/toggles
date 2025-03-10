import { useState, useEffect } from "react";
import "./App.css";
import questions from "./data/questions.json";
import AnswerSet from "./components/AnswerSet";

// Generating a random order of indexes for questions
// This is outside of the component so it remains static
const createQuestionOrder = () => {
  // Store indexes
  const orderArr = [];
  for (let i = 0; i < questions.length; i++) {
    orderArr.push(i);
  }

  // Using Fisher-Yates Sorting Algorithm
  // Shuffle indexes to represent random order
  for (let i = orderArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [orderArr[i], orderArr[j]] = [orderArr[j], orderArr[i]]; // Swap elements
  }
  return orderArr;
};

const questionOrder: number[] = createQuestionOrder();

function App() {
  const [outcome, setOutcome] = useState<boolean[]>([]);
  const [numCorrect, setNumCorrect] = useState<number[]>([]);
  const [curQuestion, setCurQuestion] = useState<number>(0);

  // Setting up outcomes / numCorrect on initial load
  useEffect(() => {
    setOutcome(new Array(questions.length).fill(false));
    setNumCorrect(new Array(questions.length).fill(0));
  }, []);

  const setColors = () => {
    if (numCorrect[curQuestion] === 0) {
      return "none-correct";
    } else if (
      numCorrect[curQuestion] ===
      questions[questionOrder[curQuestion]].answers.length
    ) {
      return "all-correct";
    } else {
      return "some-correct";
    }
  };

  useEffect(() => {
    if (
      numCorrect[curQuestion] ===
      questions[questionOrder[curQuestion]].answers.length
    ) {
      setOutcome((prev) => {
        // Set the specific item to true, return the whole array
        prev[curQuestion] = true;
        return prev;
      });
    }
  }, [numCorrect, curQuestion]);

  function handlePreviousQuestion() {
    setCurQuestion((prev) => {
      if (prev === 0) {
        return questions.length - 1;
      } else {
        return prev - 1;
      }
    });
  }

  function handleNextQuestion() {
    setCurQuestion((prev) => {
      if (prev === questions.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  }

  return (
    <div
      className={`flex flex-col items-center font-semibold justify-center h-screen ${setColors()}`}
    >
      <h3 className="text-2xl m-4">
        {questions[questionOrder[curQuestion]].question}
      </h3>
      <div id="answers_container">
        {questions[questionOrder[curQuestion]].answers.map(
          (answerArr, index) => {
            return (
              <AnswerSet
                answerArr={answerArr}
                setNumCorrect={setNumCorrect}
                outcome={outcome}
                curQuestion={curQuestion}
                key={`pair-${index}`}
              />
            );
          }
        )}
      </div>
      <p className="text-xl m-4">
        The answer is {outcome[curQuestion] ? "correct" : " incorrect"}
      </p>
      <div id="next_prev_container" className="flex justify-center w-2xs">
        <button
          onClick={handlePreviousQuestion}
          // disabled={!outcome}
          className="border rounded-full p-2 m-2 w-1/2 cursor-pointer"
        >
          Previous
        </button>
        <button
          onClick={handleNextQuestion}
          // disabled={!outcome}
          className="border rounded-full p-2 m-2 w-1/2 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
