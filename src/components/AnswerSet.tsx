import { useState, useEffect, useRef } from "react";

export default function AnswerSet({
  answerArr,
  answerSetIndex,
  numCorrect,
  setNumCorrect,
  outcome,
}) {
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
  const width = `w-1/${answerArr.length}`;
  const height = `h-1/${answerArr.length}`;

  // Run initial count
  useEffect(() => {
    if (!initialCountCompleted.current) {
      // If the answer has been randomised as true, then add one to the previous count
      // Otherwise, it remains as before
      setNumCorrect((prev: number) => prev + (isCorrect ? 1 : 0));
      initialCountCompleted.current = true;
    }
  }, []);

  // Counting correct answers

  //   useEffect(() => {
  //     setNumCorrect((prev: number) => {
  //       if (answerArr[randomIndex].correct) {
  //         return prev + 1;
  //       } else {
  //         return prev;
  //       }
  //     });
  //   }, [answerArr, randomIndex, setNumCorrect]);

  function handleChange(answerObj, index) {
    // If all answers are correct, prevent further changes
    if (!outcome) {
      setSelectedIndex(index);

      if (answerObj.correct !== isCorrect) {
        setNumCorrect((prev: number) =>
          answerObj.correct ? prev + 1 : prev - 1
        );
      }

      setIsCorrect(answerObj.correct);

      //   if (answerArr[selectedIndex].correct) {
      //     console.log("Y");
      //     setNumCorrect((prev: number) => {
      //       return prev + 1;
      //     });
      //     setIsCorrect(true);
      //   } else {
      //     if (isCorrect) {
      //       console.log("N1");
      //       setNumCorrect((prev: number) => prev - 1);
      //     } else {
      //       console.log("N2");
      //       setNumCorrect((prev: number) => prev);
      //     }
      //     setIsCorrect(false);
      //   }
    }
  }
  useEffect(() => {
    console.log(numCorrect);
  }, [numCorrect]);

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
}
