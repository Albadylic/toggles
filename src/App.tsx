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
    <span onClick={moveSlider}>
      <p>{answerObj.text}</p>
    </span>
  );
}

function App() {
  const [outcome, setOutcome] = useState(false);
  return (
    <div>
      <h3>{question}</h3>
      <div id="answers_container">
        {answers.map((answerPair, index) => {
          return (
            <div key={`pair-${index}`}>
              {answerPair.map((answerObj) => (
                <Slider answerObj={answerObj} key={answerObj.text} />
              ))}
            </div>
          );
        })}
      </div>
      {outcome ? <p>The answer is correct</p> : <p>The answer is incorrect</p>}
    </div>
  );
}

export default App;
