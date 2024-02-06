const R = require("ramda");

export const ensureArray = <TNode>(
  nodes: TNode[] | null | object | undefined,
): TNode[] =>
  R.cond([
    [R.isNil, R.always([])],
    [R.is(Array), R.identity],
    [R.is(Object), R.of(Array)],
  ])(nodes);
