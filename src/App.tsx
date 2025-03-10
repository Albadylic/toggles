import { useState, useEffect } from "react";
import "./App.css";
import questions from "./data/questions.json";
import AnswerSet from "./components/AnswerSet";

// Generating a random order of indexes for questions
// This is outside of the component so it remains static
const createQuestionOrder = () => {
  // Store indexes
  const orderArr = questions.map((item, index) => {
    return index;
  });

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
  const [outcome, setOutcome] = useState<boolean>(false);
  const [numCorrect, setNumCorrect] = useState<number>(0);
  const [curQuestion, setCurQuestion] = useState<number>(0);

  const setColors = () => {
    if (numCorrect === 0) {
      return "none-correct";
    } else if (
      numCorrect === questions[questionOrder[curQuestion]].answers.length
    ) {
      return "all-correct";
    } else {
      return "some-correct";
    }
  };

  useEffect(() => {
    if (numCorrect === questions[questionOrder[curQuestion]].answers.length) {
      setOutcome(true);
    } else {
      setOutcome(false);
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
    setOutcome(false);
    setNumCorrect(0);
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
                key={`pair-${index}`}
              />
            );
          }
        )}
      </div>
      <p className="text-xl m-4">
        The answer is {outcome ? "correct" : " incorrect"}
      </p>
      <div id="next_prev_container" className="flex justify-between">
        <button
          onClick={handlePreviousQuestion}
          // disabled={!outcome}
          className="border rounded-full p-2 m-2 hover:selected-bg"
        >
          Previous
        </button>
        <button
          onClick={handleNextQuestion}
          // disabled={!outcome}
          className="border rounded-full p-2 m-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
