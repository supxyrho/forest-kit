'use strict';

var globals = require('@jest/globals');
var operators_traverseWithApply = require('../operators/traverseWithApply.js');

const R = require("ramda");
globals.describe("traverseWithApply", () => {
    globals.test("각각의 노드에 대해서, 콜백 함수를 호출한다.", () => {
        const originalNodes = [
            {
                name: "1",
                children: [
                    {
                        name: "1-1",
                        children: [
                            {
                                name: "1-1-1",
                                children: [
                                    { name: "1-1-1-1", children: [] },
                                    { name: "1-1-1-2", children: [] },
                                ],
                            },
                        ],
                    },
                    { name: "1-1-2", children: [] },
                ],
            },
            {
                name: "1-2",
                children: [
                    {
                        name: "1-2-1",
                        children: [
                            { name: "1-2-1-1", children: [] },
                            { name: "1-2-1-2", children: [] },
                        ],
                    },
                    { name: "1-2-2", children: [] },
                ],
            },
            { name: "1-3", children: [] },
        ];
        const callback = globals.jest.fn(R.identity);
        const ops = {
            childrenKey: "children",
        };
        operators_traverseWithApply.traverseWithApply(ops, callback, originalNodes);
        globals.expect(callback).toHaveBeenCalledTimes(12);
    });
    globals.test("빈 배열인 경우, 콜백 함수를 호출하지 않으며 빈 배열을 반환한다", () => {
        const callback = globals.jest.fn(R.identity);
        const ops = {
            childrenKey: "children",
        };
        globals.expect(operators_traverseWithApply.traverseWithApply(ops, callback, [])).toEqual([]);
        globals.expect(callback).toHaveBeenCalledTimes(0);
    });
    globals.test("undefined인 경우, error를 throw한다.", () => {
        const ops = {
            childrenKey: "children",
        };
        globals.expect(() => operators_traverseWithApply.traverseWithApply(ops, R.identity, undefined)).toThrow();
    });
});
