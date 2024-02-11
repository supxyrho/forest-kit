const R = require("ramda");

export const countChar = R.curry((char, str) =>
  R.pipe(R.split(""), R.filter(R.equals(char)), R.length)(str)
);
