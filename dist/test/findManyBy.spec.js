'use strict';

var globals = require('@jest/globals');
var operators_findManyBy = require('../operators/findManyBy.js');

// @TODO: 테스트 케이스 추가
globals.describe("findManyBy", () => {
    globals.test("특정 조건의 노드를 찾으면, 해당 조건을 만족하는 모든 노드를 반환한다.", () => {
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
            globals.expect.objectContaining({ name: "1-1-1" }),
            globals.expect.objectContaining({ name: "1-1-1-1" }),
            globals.expect.objectContaining({ name: "1-1-1-2" }),
        ];
        const ops = { childrenKey };
        const predicate = (node) => ["1-1-1", "1-1-1-1", "1-1-1-2"].includes(node.name);
        globals.expect(operators_findManyBy.findManyBy(ops, predicate, originalNodes)).toEqual(expectedNodes);
    });
    globals.test("특정 조건의 노드가 존재하지 않으면, 빈 배열을 반환한다.", () => {
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
        const predicate = (node) => ["not exist"].includes(node.name);
        globals.expect(operators_findManyBy.findManyBy(ops, predicate, originalNodes)).toEqual([]);
    });
    // @TODO: 추후 test blockName 개선
    globals.test("다중 find ... 생략 ", () => {
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
        const expectedNodes = [
            globals.expect.objectContaining({ name: "1" }),
            globals.expect.objectContaining({ name: "1-1" }),
            globals.expect.objectContaining({ name: "1-1-1" }),
            globals.expect.objectContaining({ name: "1-1-1-1" }),
        ];
        globals.expect(operators_findManyBy.findManyBy(ops, predicate, originalNodes)).toEqual(expectedNodes);
    });
});
