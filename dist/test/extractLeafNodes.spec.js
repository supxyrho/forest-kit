'use strict';

var globals = require('@jest/globals');
var operators_extractLeafNodes = require('../operators/extractLeafNodes.js');

globals.describe("extractLeafNodes", () => {
    globals.test("모든 단말 노드를 반환한다.", () => {
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
        const expectedNodes = [
            { name: "1-1-1-1", children: [] },
            { name: "1-1-1-2", children: [] },
            { name: "1-1-2", children: [] },
            { name: "1-2-1-1", children: [] },
            { name: "1-2-1-2", children: [] },
            { name: "1-2-2", children: [] },
            { name: "1-3", children: [] },
        ];
        const ops = { childrenKey };
        globals.expect(operators_extractLeafNodes.extractLeafNodes(ops, originalNodes)).toEqual(expectedNodes);
    });
    globals.test("빈 배열인 경우, 빈 배열을 반환한다.", () => {
        const childrenKey = "children";
        const ops = { childrenKey };
        globals.expect(operators_extractLeafNodes.extractLeafNodes(ops, [])).toEqual([]);
    });
});
