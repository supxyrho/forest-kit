'use strict';

var globals = require('@jest/globals');
var operators_findOneBy = require('../operators/findOneBy.js');

// @TODO: 테스트 케이스 추가
globals.describe("findOneBy", () => {
    // @TODO: 추후 test blockName 개선
    globals.test("단일 find ... 생략 ", () => {
        const childrenKey = "children";
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
            childrenKey,
        };
        const predicate = (node) => ["1", "1-1", "1-1-1", "1-1-1-1"].includes(node.name);
        const expectedNode = globals.expect.objectContaining({ name: "1" });
        globals.expect(operators_findOneBy.findOneBy(ops, predicate, originalNodes)).toEqual(expectedNode);
    });
});
