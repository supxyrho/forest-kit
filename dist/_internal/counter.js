'use strict';

const createCounter = (initialCount = 0) => {
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

exports.createCounter = createCounter;
