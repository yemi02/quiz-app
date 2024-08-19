import { useEffect } from "react";
import { decodeHTML } from "../../utils/helperFunctions";

/* coomplete the answers sections so that when you click the correct answer it shows green 
and when you click the wrong answer it shows red as well as the right answer in green */
const Card = ({ results, questionIdx, question, answers }) => {
  const checkAnswer = (answer) => {
    console.log(answer);
  };
  return (
    <>
      <div className="w-full mb-4">
        <span className="font-semibold text-lg sm:text-xl text-blue-900">
          {results.length !== 0 ? questionIdx + 1 + ". " : ""}
          {decodeHTML(question)}
        </span>
      </div>
      <div className="w-[80%] mx-auto ">
        {answers?.map((answer) => {
          return (
            <button
              onClick={() => checkAnswer(answer)}
              key={answer.answer}
              className={`w-full my-2 p-2 rounded border-2 border-blue-900 ${
                false && "hover:bg-blue-900"
              } group ${
                true &&
                (answer.isCorrect
                  ? "correct hover:bg-none cursor-not-allowed"
                  : "incorrect hover:bg-none cursor-not-allowed")
              }`}
            >
              <span
                className={`font-medium text-lg sm:text-xl text-blue-900 group-hover:text-white ${
                  true
                    ? " group-hover:text-blue-900"
                    : " group-hover:text-white"
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
