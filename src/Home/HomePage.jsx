import { useEffect } from "react";
import { decodeHTML } from "../utils/helperFunctions";
import Card from "./Card";
import ArrowButtons from "./ArrowButtons";
import useTrivia from "../hooks/useTrivia";

const HomePage = () => {
  const { getFromOTDB, trivia, triviaLength } = useTrivia();

  useEffect(() => {
    getFromOTDB();
  }, []);

  return (
    <div className="max-w-4xl min-w-[450px] w-[90%] mx-auto bg-blue-100 flex justify-center py-5 mt-20 rounded-xl">
      <div className="rounded-lg flex flex-col items-center w-full">
        {/* Title */}
        <h1 className="font-bold text-2xl sm:text-3xl text-center text-blue-900 p-5">
          {decodeHTML(trivia.category)}
        </h1>

        <div className="bg-blue-900 h-1 w-[95%]" aria-hidden />

        {/* Card content: questions and answers */}
        <div className="w-full py-6 px-16 relative">
          <Card />
          <ArrowButtons />
        </div>

        {/* submit button */}
        {triviaLength !== 0 ? (
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
