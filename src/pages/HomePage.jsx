import { useEffect, useRef, useState } from "react";
import { decodeHTML, fetchFromOTDB } from "../utils/helperFunctions";

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const hasFetched = useRef(false);

  useEffect(() => {
    const getFromOTDB = async () => {
      try {
        if (hasFetched.current) return;
        hasFetched.current = true;
        const data = await fetchFromOTDB();
        setResults(data?.results);
      } catch (error) {
        console.log("error in useEffect: " + error.message);
      }
    };

    getFromOTDB();
  }, []);

  useEffect(() => {
    const getQuestionAndAnswers = () => {
      if (results.length === 0) {
        setAnswers([]);
        return;
      }
      const result = results?.[questionIdx];

      if (result) {
        const newArr = [...result?.incorrect_answers, result?.correct_answer];
        setCategory(result.category);
        setQuestion(result.question);
        setAnswers(newArr);
      }
    };

    getQuestionAndAnswers();
  }, [results, questionIdx]);

  const moveLeft = () => {
    if (questionIdx === 0) return;
    setQuestionIdx((prev) => prev - 1);
  };
  const moveRight = () => {
    if (questionIdx === results.length - 1) return;
    setQuestionIdx((prev) => prev + 1);
  };
  console.log("question", question);
  console.log("answers", answers);

  return (
    <div className="max-w-4xl w-[90%] mx-auto bg-blue-100 flex justify-center py-5 mt-20 rounded-xl">
      <div className="rounded-lg flex flex-col items-center w-full">
        {/* header */}
        <h1 className="font-bold text-2xl sm:text-3xl text-center text-blue-900 p-5">
          {decodeHTML(category)}
        </h1>

        {/* separator */}
        <div className="bg-blue-900 h-1 w-[95%]" />

        {/* questions container */}
        <div className="w-full py-6 px-16 relative">
          {/* question selection buttons */}

          {results.length !== 0 ? (
            <div>
              <button
                onClick={moveLeft}
                className={`p-1 absolute top-1/2 left-10 bg-blue-900/50 rounded-full ${
                  questionIdx === 0
                    ? "cursor-not-allowed hover:bg-blue-900/75 rounded-full"
                    : "cursor-pointer"
                }`}
              >
                <img
                  src="/left-arrow.png"
                  alt=""
                  className="size-6 text-white"
                />
              </button>

              <button
                onClick={moveRight}
                className={`p-1 absolute top-1/2 right-10 bg-blue-900/50 rounded-full ${
                  questionIdx === results.length - 1
                    ? "cursor-not-allowed hover:bg-blue-900/75 rounded-full"
                    : "cursor-pointer"
                }`}
              >
                <img
                  src="/right-arrow.png"
                  alt=""
                  className="size-6 text-white"
                />
              </button>
            </div>
          ) : (
            ""
          )}
          {/* question html */}

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
                  key={answer}
                  className="w-full my-2 p-2 rounded border-2 border-blue-900 hover:bg-blue-900 group"
                >
                  <span className="font-medium text-lg sm:text-xl text-blue-900 group-hover:text-white">
                    {decodeHTML(answer)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* next button */}
        {results.length !== 0 ? (
          <div>
            <button
              className="w-40 my-2 p-2 rounded-lg border-2 
        
        bg-blue-900 hover:bg-blue-900/85 group"
            >
              <span className="font-medium text-lg sm:text-xl text-white">
                Submit
              </span>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default HomePage;
