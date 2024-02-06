'use strict';

var globals = require('@jest/globals');
var operators_changePropNameToEachNode = require('../operators/changePropNameToEachNode.js');

globals.describe("changePropNameToEachNode", () => {
    globals.test("각각의 노드에 대해서, 특정 prop의 이름을 변경한다", () => {
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
                newName: "1",
                children: [
                    {
                        newName: "1-1",
                        children: [
                            {
                                newName: "1-1-1",
                                children: [
                                    { newName: "1-1-1-1", children: [] },
                                    { newName: "1-1-1-2", children: [] },
                                ],
                            },
                        ],
                    },
                    { newName: "1-1-2", children: [] },
                ],
            },
            {
                newName: "1-2",
                children: [
                    {
                        newName: "1-2-1",
                        children: [
                            { newName: "1-2-1-1", children: [] },
                            { newName: "1-2-1-2", children: [] },
                        ],
                    },
                    { newName: "1-2-2", children: [] },
                ],
            },
            { newName: "1-3", children: [] },
        ];
        const ops = { childrenKey };
        globals.expect(operators_changePropNameToEachNode.changePropNameToEachNode(ops, "name", "newName", originalNodes)).toEqual(expectedNodes);
    });
});
