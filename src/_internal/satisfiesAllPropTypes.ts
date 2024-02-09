const R = require("ramda");

export const satisfiesAllPropTypes = R.curry((propsWithTypes, obj) =>
  R.equals(
    R.toPairs(propsWithTypes),
    R.pipe(
      R.toPairs,
      R.map(([key, value]) => [key, R.type(value)])
    )(obj)
  )
);
