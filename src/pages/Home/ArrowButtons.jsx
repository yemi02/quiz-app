const ArrowButtons = ({ questionIdx, setQuestionIdx, results }) => {
  const moveLeft = () => {
    if (questionIdx === 0) return;
    setQuestionIdx((prev) => prev - 1);
  };
  const moveRight = () => {
    if (questionIdx === results.length - 1) return;
    setQuestionIdx((prev) => prev + 1);
  };
  return (
    <>
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
            <img src="/left-arrow.png" alt="" className="size-6 text-white" />
          </button>

          <button
            onClick={moveRight}
            className={`p-1 absolute top-1/2 right-10 bg-blue-900/50 rounded-full ${
              questionIdx === results.length - 1
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
