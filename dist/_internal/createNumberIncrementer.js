'use strict';

const createNumberIncrementer = (currentNumber) => ({
    next: () => ++currentNumber,
});

exports.createNumberIncrementer = createNumberIncrementer;
