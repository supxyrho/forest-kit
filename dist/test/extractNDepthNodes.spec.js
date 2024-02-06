'use strict';

var globals = require('@jest/globals');
var operators_extractNDepthNodes = require('../operators/extractNDepthNodes.js');

globals.describe("extractNDepthNodes", () => {
    globals.test("특정 계층의 모든 노드를 반환한다.", () => {
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
            {
                name: "1-1-1",
                children: [
                    { name: "1-1-1-1", children: [] },
                    { name: "1-1-1-2", children: [] },
                ],
            },
            { name: "1-2-1-1", children: [] },
            { name: "1-2-1-2", children: [] },
        ];
        const ops = { childrenKey };
        globals.expect(operators_extractNDepthNodes.extractNDepthNodes(ops, 2, originalNodes)).toEqual(expectedNodes);
    });
});
