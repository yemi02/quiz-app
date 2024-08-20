import useTrivia from "../hooks/useTrivia";
import useTriviaStore from "../store/triviaStore";

const ArrowButtons = () => {
  const { getFromOTDB, trivia, triviaLength } = useTrivia();
  const { questionIdx, setQuestionIdx, hasBeenAnswered, setHasBeenAnswered } =
    useTriviaStore();

  const moveLeft = () => {
    if (questionIdx === 0) return;
    setQuestionIdx(questionIdx - 1);
  };
  const moveRight = () => {
    if (questionIdx === triviaLength - 1) return;
    setQuestionIdx(questionIdx + 1);
  };
  return (
    <>
      {triviaLength !== 0 ? (
        <div>
          <button
            onClick={moveLeft}
            className={`p-1 absolute top-1/2 left-10 bg-blue-900/50 rounded-full ${
              questionIdx === 0
                ? "cursor-not-allowed hover:bg-blue-900/75 rounded-full"
                : "cursor-pointer"
            }`}
          >
            <img src="/left-arrow.png" alt="" className="size-6 text-white" />
          </button>

          <button
            onClick={moveRight}
            className={`p-1 absolute top-1/2 right-10 bg-blue-900/50 rounded-full ${
              questionIdx === triviaLength - 1
                ? "cursor-not-allowed hover:bg-blue-900/75 rounded-full"
                : "cursor-pointer"
            }`}
          >
            <img src="/right-arrow.png" alt="" className="size-6 text-white" />
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ArrowButtons;
