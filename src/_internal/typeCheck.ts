const R = require("ramda");

export const isNonArrayTypeObject = R.both(
  R.complement(R.is(Array)),
  R.is(Object),
);
