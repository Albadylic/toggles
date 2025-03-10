import { FC, useState, useEffect, useRef } from "react";

type answerArrType = answerObjType[];

type answerObjType = {
  text: string;
  correct: boolean;
};

interface AnswerSetProps {
  answerArr: answerArrType;
  setNumCorrect: React.Dispatch<React.SetStateAction<number>>;
  outcome: boolean;
}

const AnswerSet: FC<AnswerSetProps> = ({
  answerArr,
  setNumCorrect,
  outcome,
}) => {
  // These states are used for positioning
  const [translationX, setTranslationX] = useState<string>("");
  const [translationY, setTranslationY] = useState<string>("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // These states are for calculating the correct answers
  const randomIndex = Math.floor(Math.random() * answerArr.length);
  const [selectedIndex, setSelectedIndex] = useState<number>(randomIndex);
  const [isCorrect, setIsCorrect] = useState<boolean>(
    answerArr[randomIndex].correct
  );
  const initialCountCompleted = useRef(false);

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

  // The width & height can be set dynamically based on number of answers
  // This is rendering inconsistently...
  //   const width = `w-1/${answerArr.length}`;
  //   const height = `h-1/${answerArr.length}`;

  // When the question changes, reset the count of correct
  //   useEffect(() => {
  //     initialCountCompleted.current = false;
  //     setSelectedIndex(Math.floor(Math.random() * answerArr.length));
  //   }, [curQuestion]);

  // Run initial count
  useEffect(() => {
    if (!initialCountCompleted.current) {
      // If the answer has been randomised as true, then add one to the previous count
      // Otherwise, it remains as before
      setNumCorrect((prev: number) => prev + (isCorrect ? 1 : 0));
      initialCountCompleted.current = true;
    }
  });

  function handleChange(answerObj: answerObjType, index: number) {
    // If all answers are correct, prevent further changes
    if (!outcome) {
      setSelectedIndex(index);

      // If the states don't match, then the 'correctness' has changed from true -> false or vice versa
      // With two answers, this will always be true
      // With >2 then an answer might change but remain incorrect
      if (answerObj.correct !== isCorrect) {
        setNumCorrect((prev: number) =>
          answerObj.correct ? prev + 1 : prev - 1
        );
      }

      setIsCorrect(answerObj.correct);
    }
  }

  return (
    <div
      ref={containerRef}
      className={`flex sm:flex-row flex-col relative items-center border rounded-lg sm:rounded-full m-2 h-min sm:h-18 w-2xs sm:w-xl md:w-2xl text-sm sm:text-base`}
    >
      <span
        id="overlay"
        className={`border border-transparent sm:rounded-full h-1/2 rounded-lg sm:h-18 w-2xs sm:w-1/2 transition-transform duration-700 selected-bg absolute z-10`}
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
};

export default AnswerSet;
