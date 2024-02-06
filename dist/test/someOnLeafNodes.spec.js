'use strict';

var globals = require('@jest/globals');
var operators_someOnLeafNodes = require('../operators/someOnLeafNodes.js');

globals.describe("someOnLeafNodes", () => {
    globals.test("모든 단말 노드가 조건을 만족하지 않으면, false를 반환한다.", () => {
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
        const condition = (node) => node.name === "not exist";
        const ops = { childrenKey };
        globals.expect(operators_someOnLeafNodes.someOnLeafNodes(ops, condition, originalNodes)).toEqual(false);
    });
    globals.test("1 depth 내 특정 조건의 단말 노드가 존재하면, true를 반환한다.", () => {
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
        const ops = { childrenKey };
        const condition = (node) => node.name === "1-3";
        globals.expect(operators_someOnLeafNodes.someOnLeafNodes(ops, condition, originalNodes)).toEqual(true);
    });
    globals.test("1depth 보다 큰 특정 조건의 단말 노드가 존재하면, true를 반환한다.", () => {
        const childrenKey = "children";
        const originalNodes = [
            { name: "1", children: [] },
            {
                name: "2",
                children: [
                    {
                        name: "2-1",
                        children: [
                            { name: "2-1-1", children: [] },
                            { name: "2-1-2", children: [] },
                        ],
                    },
                    { name: "2-2", children: [] },
                ],
            },
            { name: "3", children: [] },
        ];
        const ops = { childrenKey };
        const condition = (node) => node.name === "2-1-2";
        globals.expect(operators_someOnLeafNodes.someOnLeafNodes(ops, condition, originalNodes)).toEqual(true);
    });
});
