import { useEffect, useState } from "react";
import { decodeHTML } from "../utils/helperFunctions";
import useTrivia from "../hooks/useTrivia";
import useTriviaStore from "../store/triviaStore";

const Card = () => {
  const [answers, setAnswers] = useState([]);
  const { questionIdx, hasBeenAnswered, setHasBeenAnswered } = useTriviaStore();
  const { trivia, triviaLength } = useTrivia();

  useEffect(() => {
    const getAnswers = () => {
      if (triviaLength === 0) {
        setAnswers([]);
        return;
      }
      if (trivia) {
        const incorrectAnswers = trivia?.incorrect_answers.map((answer) => {
          return { isCorrect: false, answer: answer, clicked: false };
        });
        const correctAnswer = {
          isCorrect: true,
          answer: trivia?.correct_answer,
          clicked: false,
        };
        const answersArr = [...incorrectAnswers, correctAnswer];
        const shuffledArr = answersArr.slice().sort(() => Math.random() - 0.5);
        setAnswers(shuffledArr);
      }
    };
    getAnswers();
  }, [trivia]);

  const checkAnswer = (index) => {
    if (hasBeenAnswered[questionIdx]) return;
    setHasBeenAnswered(questionIdx, true);
    const updatedAnswers = answers.map((answer, idx) => {
      return idx === index ? { ...answer, clicked: true } : answer;
    });
    setAnswers(updatedAnswers);
  };

  console.log(answers);

  return (
    <>
      <div className="w-full mb-4">
        <span className="font-semibold text-lg sm:text-xl text-blue-900">
          {triviaLength !== 0 ? questionIdx + 1 + ". " : ""}
          {decodeHTML(trivia.question)}
        </span>
      </div>
      <div className="w-[80%] mx-auto ">
        {answers?.map((answer, index) => {
          return (
            <button
              onClick={() => checkAnswer(index)}
              key={answer.answer}
              className={`w-full my-2 p-2 rounded border-2 border-blue-900 group ${
                hasBeenAnswered[questionIdx] && answer.isCorrect
                  ? "correct"
                  : ""
              } ${!hasBeenAnswered[questionIdx] ? "hover:bg-blue-900" : ""} ${
                hasBeenAnswered && answer.clicked
                  ? !answer.isCorrect && "incorrect"
                  : ""
              }`}
            >
              <span
                className={`font-medium text-lg sm:text-xl text-blue-900 ${
                  !hasBeenAnswered[questionIdx] && "group-hover:text-white"
                }`}
              >
                {decodeHTML(answer.answer)}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Card;
