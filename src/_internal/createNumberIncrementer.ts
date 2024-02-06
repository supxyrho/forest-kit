type ICreateNumberIncrementer = (currentNumber: number) => {
  next: () => number;
};

export const createNumberIncrementer: ICreateNumberIncrementer = (
  currentNumber: number,
) => ({
  next: () => ++currentNumber,
});
