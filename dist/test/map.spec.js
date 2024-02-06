'use strict';

var globals = require('@jest/globals');
var operators_map = require('../operators/map.js');

globals.describe("map", () => {
    globals.test("각각의 노드에 대해서, 새 prop과 value를 추가한다", () => {
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
                name: "1",
                newKey: "newValue",
                children: [
                    {
                        name: "1-1",
                        newKey: "newValue",
                        children: [
                            {
                                name: "1-1-1",
                                newKey: "newValue",
                                children: [
                                    { name: "1-1-1-1", newKey: "newValue", children: [] },
                                    { name: "1-1-1-2", newKey: "newValue", children: [] },
                                ],
                            },
                        ],
                    },
                    { name: "1-1-2", newKey: "newValue", children: [] },
                ],
            },
            {
                name: "1-2",
                newKey: "newValue",
                children: [
                    {
                        name: "1-2-1",
                        newKey: "newValue",
                        children: [
                            { name: "1-2-1-1", newKey: "newValue", children: [] },
                            { name: "1-2-1-2", newKey: "newValue", children: [] },
                        ],
                    },
                    { name: "1-2-2", newKey: "newValue", children: [] },
                ],
            },
            { name: "1-3", newKey: "newValue", children: [] },
        ];
        const ops = { childrenKey: "children" };
        const mapFunction = (node) => ({ ...node, newKey: "newValue" });
        globals.expect(operators_map.map(ops, mapFunction, originalNodes)).toEqual(expectedNodes);
    });
    globals.test("빈 배열인 경우, 빈 배열을 반환한다.", () => {
        const ops = { childrenKey: "children" };
        globals.expect(operators_map.map(ops, () => "newValue", [])).toEqual([]);
    });
    globals.test("undefined인 경우, error를 throw한다.", () => {
        const ops = { childrenKey: "children" };
        globals.expect(() => operators_map.map(ops, () => "newValue", undefined)).toThrow();
    });
});
