import { create } from "zustand";

const useTriviaStore = create((set) => ({
  trivias: [],
  setTrivias: (newTrivias) => set({ trivias: newTrivias }),
  questionIdx: 0,
  setQuestionIdx: (newIdx) => set({ questionIdx: newIdx }),
  hasBeenAnswered: Array(10).fill(false),

  // Function to update the hasBeenAnswered array
  setHasBeenAnswered: (index, value) =>
    set((state) => {
      const newHasBeenAnswered = [...state.hasBeenAnswered];
      newHasBeenAnswered[index] = value;
      return { hasBeenAnswered: newHasBeenAnswered };
    }),
}));

export default useTriviaStore;
