import { useState } from "react";
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

function Slider({ answerObj }) {
  function moveSlider() {
    // Move slider overlay over the answer.
  }

  // Run a counter to check how many true answers there are

  console.log(answerObj);

  return (
    <span onClick={moveSlider} className="p-4">
      <p>{answerObj.text}</p>
    </span>
  );
}

function App() {
  const [outcome, setOutcome] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h3 className="text-2xl m-4">{question}</h3>
      <div id="answers_container">
        {answers.map((answerPair, index) => {
          return (
            <div
              key={`pair-${index}`}
              className="flex justify-evenly p-2 border rounded-full m-2"
            >
              {answerPair.map((answerObj) => (
                <Slider answerObj={answerObj} key={answerObj.text} />
              ))}
            </div>
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
