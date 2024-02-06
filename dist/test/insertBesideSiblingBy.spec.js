'use strict';

var globals = require('@jest/globals');
var operators_insertBesideSiblingBy = require('../operators/insertBesideSiblingBy.js');

/* eslint-disable prettier/prettier */
globals.describe("insertBesideSiblingBy", () => {
    globals.describe("객체 삽입", () => {
        globals.test("기본 설정 시, 특정 조건의 형제 노드의 다음 index에 삽입한다.", () => {
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
                                { name: "newNode", children: [] },
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
                // at 기본값이 right  
            };
            const predicate = (node) => node.name === "1-1-1";
            const newNode = { name: "newNode", children: [] };
            globals.expect(operators_insertBesideSiblingBy.insertBesideSiblingBy(ops, predicate, newNode, originalNodes)).toEqual(expectedNodes);
        });
        globals.test("형제 노드의 left 삽입 옵션 시, 특정 조건의 형제 노드의 이전 index에 삽입한다.", () => {
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
                    name: "1",
                    children: [
                        {
                            name: "1-1",
                            children: [
                                { name: "newNode", children: [] },
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
                at: "left",
            };
            const predicate = (node) => node.name === "1-1-1";
            const newNode = { name: "newNode", children: [] };
            globals.expect(operators_insertBesideSiblingBy.insertBesideSiblingBy(ops, predicate, newNode, originalNodes)).toEqual(expectedNodes);
        });
        globals.test("형제 노드의 right 삽입 옵션 시, 특정 조건의 형제 노드의 다음 index에 삽입한다.", () => {
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
                                { name: "newNode", children: [] },
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
                at: "right",
            };
            const predicate = (node) => node.name === "1-1-1";
            const newNode = { name: "newNode", children: [] };
            globals.expect(operators_insertBesideSiblingBy.insertBesideSiblingBy(ops, predicate, newNode, originalNodes)).toEqual(expectedNodes);
        });
    });
    globals.describe("배열 삽입", () => {
        globals.test("기본 설정 시, 특정 조건의 형제 노드의 다음 index에 삽입한다.", () => {
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
                                { name: "newNode-1", children: [] },
                                { name: "newNode-2", children: [] },
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
                // at 기본값이 last
            };
            const predicate = (node) => node.name === "1-1-1";
            const newNodes = [{ name: "newNode-1", children: [] }, { name: "newNode-2", children: [] }];
            globals.expect(operators_insertBesideSiblingBy.insertBesideSiblingBy(ops, predicate, newNodes, originalNodes)).toEqual(expectedNodes);
        });
        globals.test("형제 노드의 left 삽입 옵션 시, 특정 조건의 형제 노드의 이전 inde에 삽입한다.", () => {
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
                    name: "1",
                    children: [
                        {
                            name: "1-1",
                            children: [
                                { name: "newNode-1", children: [] },
                                { name: "newNode-2", children: [] },
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
                at: "left",
            };
            const predicate = (node) => node.name === "1-1-1";
            const newNodes = [{ name: "newNode-1", children: [] }, { name: "newNode-2", children: [] }];
            globals.expect(operators_insertBesideSiblingBy.insertBesideSiblingBy(ops, predicate, newNodes, originalNodes)).toEqual(expectedNodes);
        });
        globals.test("형제노드의 right 삽입 옵션 시, 특정 조건의 형제 노드의 이전 inde에 삽입한다.", () => {
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
                                { name: "newNode-1", children: [] },
                                { name: "newNode-2", children: [] },
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
                at: "right",
            };
            const predicate = (node) => node.name === "1-1-1";
            const newNodes = [{ name: "newNode-1", children: [] }, { name: "newNode-2", children: [] }];
            globals.expect(operators_insertBesideSiblingBy.insertBesideSiblingBy(ops, predicate, newNodes, originalNodes)).toEqual(expectedNodes);
        });
    });
});
