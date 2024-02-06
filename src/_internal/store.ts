const R = require("ramda");

// @TODO: 불변 처리
// @TODO: store를 불변 처리한다면, ifThen에서 어떻게 store를 갱신해야 할까?
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Store = (initialStore) => {
  let store = initialStore;

  return {
    update: (nextStore) => {
      store = R.clone(nextStore);
    },
    get: () => R.clone(store),
  };
};
