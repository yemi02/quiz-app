import { useEffect, useRef, useState } from "react";
import { decodeHTML, fetchFromOTDB } from "../../utils/helperFunctions";
import Card from "./Card";
import ArrowButtons from "./ArrowButtons";

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
        const incorrectAnswers = result?.incorrect_answers.map((answer) => {
          return { isCorrect: false, answer: answer };
        });
        setCategory(result.category);
        setQuestion(result.question);
        const correctAnswer = {
          isCorrect: true,
          answer: result?.correct_answer,
        };
        const newArr = [...incorrectAnswers, correctAnswer];
        const shuffledArr = newArr.slice().sort(() => Math.random() - 0.5);
        setAnswers(shuffledArr);
      }
    };

    getQuestionAndAnswers();
  }, [results, questionIdx]);

  console.log(answers);

  return (
    <div className="max-w-4xl w-[90%] mx-auto bg-blue-100 flex justify-center py-5 mt-20 rounded-xl">
      <div className="rounded-lg flex flex-col items-center w-full">
        {/* Title */}
        <h1 className="font-bold text-2xl sm:text-3xl text-center text-blue-900 p-5">
          {decodeHTML(category)}
        </h1>

        <div className="bg-blue-900 h-1 w-[95%]" aria-hidden />

        {/* Card content: questions and answers */}
        <div className="w-full py-6 px-16 relative">
          <Card
            results={results}
            questionIdx={questionIdx}
            question={question}
            answers={answers}
          />

          <ArrowButtons
            questionIdx={questionIdx}
            setQuestionIdx={setQuestionIdx}
            results={results}
          />
        </div>

        {/* submit button */}
        {results.length !== 0 ? (
          <button className="w-40 my-2 p-2 rounded-lg border-2 bg-blue-900 hover:bg-blue-900/85 group">
            <span className="font-medium text-lg sm:text-xl text-white">
              Submit
            </span>
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default HomePage;
