'use strict';

var globals = require('@jest/globals');
var operators_tapOneBy = require('../operators/tapOneBy.js');

const R = require("ramda");
// @TODO: 테스트 케이스 추가
globals.describe("tapOneBy", () => {
    globals.test("특정 조건의 노드에 대해서, tap을 적용한다. ", () => {
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
        const ops = {
            childrenKey: "children",
            applyTimesBoundary: [0, 1],
        };
        const predicate = (node) => ["1-1"].includes(node.name);
        const callback = globals.jest.fn(R.identity);
        operators_tapOneBy.tapOneBy(ops, predicate, callback, originalNodes);
        globals.expect(callback).toHaveBeenCalledTimes(1);
    });
});
