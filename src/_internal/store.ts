const R = require("ramda");

export const Store = (initialStore) => {
  let store = initialStore;

  return {
    update: (nextStore) => {
      store = R.clone(nextStore);
    },
    get: () => R.clone(store),
  };
};
