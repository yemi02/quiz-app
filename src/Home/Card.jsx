import { useEffect, useState } from "react";
import { decodeHTML } from "../utils/helperFunctions";
import useTrivia from "../hooks/useTrivia";
import useTriviaStore from "../store/triviaStore";

const Card = () => {
  const { questionIdx, hasBeenAnswered, setHasBeenAnswered } = useTriviaStore();

  const { trivia, triviaLength, answers } = useTrivia();

  const checkAnswer = (e, answer) => {
    if (hasBeenAnswered[questionIdx]) return;
    setHasBeenAnswered(questionIdx, true);
  };

  return (
    <>
      <div className="w-full mb-4">
        <span className="font-semibold text-lg sm:text-xl text-blue-900">
          {triviaLength !== 0 ? questionIdx + 1 + ". " : ""}
          {decodeHTML(trivia.question)}
        </span>
      </div>
      <div className="w-[80%] mx-auto ">
        {answers?.map((answer) => {
          return (
            <button
              onClick={(e) => checkAnswer(e, answer)}
              key={answer.answer}
              className={`w-full my-2 p-2 rounded border-2 border-blue-900 group ${
                hasBeenAnswered[questionIdx] && answer.isCorrect
                  ? "correct"
                  : ""
              } ${!hasBeenAnswered[questionIdx] ? "hover:bg-blue-900" : ""} `}
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
