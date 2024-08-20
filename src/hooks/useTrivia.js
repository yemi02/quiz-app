import { useEffect, useRef, useState } from "react";
import { fetchFromOTDB } from "../utils/helperFunctions";
import useTriviaStore from "../store/triviaStore";

const useTrivia = () => {
  const {
    trivias,
    setTrivias,
    questionIdx,
    setQuestionIdx,
    hasBeenAnswered,
    setHasBeenAnswered,
  } = useTriviaStore();

  const [trivia, setTrivia] = useState("");
  const [triviaLength, setTriviaLength] = useState("");
  const [answers, setAnswers] = useState([]);

  const hasFetched = useRef(false);

  const getFromOTDB = async () => {
    try {
      if (hasFetched.current) return;
      hasFetched.current = true;
      const data = await fetchFromOTDB();
      setTrivias(data?.results);
      const newArr = Array(triviaLength).fill(false);
      setHasBeenAnswered(newArr);
    } catch (error) {
      console.log("error in useEffect: " + error.message);
    }
  };

  useEffect(() => {
    const getQuestionAndAnswers = () => {
      if (trivias?.length === 0) {
        setAnswers([]);
        return;
      }

      const trivia = trivias?.[questionIdx];

      if (trivia) {
        const incorrectAnswers = trivia?.incorrect_answers.map((answer) => {
          return { isCorrect: false, answer: answer, clicked: false };
        });
        setTrivia(trivia);
        setTriviaLength(trivias.length);
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
    console.log(trivias, "trivias");

    getQuestionAndAnswers();
  }, [trivias, questionIdx]);

  return { getFromOTDB, triviaLength, trivia, answers };
};

export default useTrivia;
