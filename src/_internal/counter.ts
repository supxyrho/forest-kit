interface ICounter {
  up: () => number;
  getCount: () => number;
  reset: () => void;
}

export const createCounter = (initialCount: number = 0): ICounter => {
  let count = initialCount;

  return {
    up: () => {
      return count++;
    },
    getCount: () => count,
    reset: () => {
      count = initialCount;
    },
  };
};
