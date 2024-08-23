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
    const getTrivia = () => {
      const trivia = trivias?.[questionIdx];

      if (trivia) {
        setTrivia(trivia);
        setTriviaLength(trivias.length);
      }
    };

    getTrivia();
  }, [trivias, questionIdx]);

  return { getFromOTDB, triviaLength, trivia };
};

export default useTrivia;
