'use strict';

var globals = require('@jest/globals');
var operators_tapManyBy = require('../operators/tapManyBy.js');

const R = require("ramda");
// @TODO: 테스트 케이스 추가
globals.describe("tapManyBy", () => {
    globals.test("설정 상 최대 5번 적용 가능 시, 5번만 tap이 적용된다. ", () => {
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
        };
        const predicate = (node) => ["1", "1-1", "1-1-1", "1-1-1-1", "1-1-1-2"].includes(node.name);
        const callback = globals.jest.fn(R.identity);
        operators_tapManyBy.tapManyBy(ops, predicate, callback, originalNodes);
        globals.expect(callback).toHaveBeenCalledTimes(5);
    });
});
