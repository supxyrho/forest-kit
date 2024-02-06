'use strict';

var globals = require('@jest/globals');
var operators_mergeTwoTrees = require('../operators/mergeTwoTrees.js');

globals.describe("mergeTwoTrees", () => {
    globals.test("leftTree와 rightTree 중, rightTree의 node에 대해서 우선순위가 더 높다. (덮어쓰기)", () => {
        const childrenKey = "children";
        const leftTree = [
            {
                name: "left-1",
                leftOnlyKey: "left-1",
                children: [
                    {
                        name: "left-1-1",
                        leftOnlyKey: "left-1-1",
                        children: [
                            {
                                name: "left-1-1-1",
                                leftOnlyKey: "left-1-1-1",
                                children: [
                                    {
                                        name: "left-1-1-1-1",
                                        leftOnlyKey: "left-1-1-1-1",
                                        children: [],
                                    },
                                    {
                                        name: "left-1-1-1-2",
                                        leftOnlyKey: "left-1-1-1-2",
                                        children: [],
                                    },
                                ],
                            },
                        ],
                    },
                    { name: "left-1-2", leftOnlyKey: "left-1-2", children: [] },
                ],
            },
            // @TODO: 2 부터 시작인데 1-2부터 시작하는 거 수정할 것.
            {
                name: "left-1-2",
                leftOnlyKey: "left-1-2",
                children: [
                    {
                        name: "left-1-2-1",
                        leftOnlyKey: "left-1-2-1",
                        children: [
                            {
                                name: "left-1-2-1-1",
                                leftOnlyKey: "left-1-2-1-1",
                                children: [],
                            },
                            {
                                name: "left-1-2-1-2",
                                leftOnlyKey: "left-1-2-1-2",
                                children: [],
                            },
                        ],
                    },
                    { name: "left-1-2-2", leftOnlyKey: "left-1-2-2", children: [] },
                ],
            },
            { name: "left-1-3", leftOnlyKey: "left-1-3", children: [] },
        ];
        const rightTree = [
            {
                name: "right-1",
                rightOnlyKey: "right-1",
                children: [
                    {
                        name: "right-1-1",
                        rightOnlyKey: "right-1-1",
                        children: [
                            {
                                name: "right-1-1-1",
                                rightOnlyKey: "right-1-1-1",
                                children: [
                                    {
                                        name: "right-1-1-1-1",
                                        rightOnlyKey: "right-1-1-1-1",
                                        children: [],
                                    },
                                    {
                                        name: "right-1-1-1-2",
                                        rightOnlyKey: "right-1-1-1-2",
                                        children: [],
                                    },
                                ],
                            },
                        ],
                    },
                    { name: "right-1-2", rightOnlyKey: "right-1-2", children: [] },
                ],
            },
            // @TODO: 2 부터 시작인데 1-2부터 시작하는 거 수정할 것.
            {
                name: "right-1-2",
                rightOnlyKey: "right-1-2",
                children: [
                    {
                        name: "right-1-2-1",
                        rightOnlyKey: "right-1-2-1",
                        children: [
                            {
                                name: "right-1-2-1-1",
                                rightOnlyKey: "right-1-2-1-1",
                                children: [],
                            },
                            {
                                name: "right-1-2-1-2",
                                rightOnlyKey: "right-1-2-1-2",
                                children: [],
                            },
                        ],
                    },
                    { name: "right-1-2-2", rightOnlyKey: "right-1-2-2", children: [] },
                ],
            },
            { name: "right-1-3", rightOnlyKey: "right:1-3", children: [] },
        ];
        const expectedTree = [
            {
                name: "right-1",
                leftOnlyKey: "left-1",
                rightOnlyKey: "right-1",
                children: [
                    {
                        name: "right-1-1",
                        leftOnlyKey: "left-1-1",
                        rightOnlyKey: "right-1-1",
                        children: [
                            {
                                name: "right-1-1-1",
                                leftOnlyKey: "left-1-1-1",
                                rightOnlyKey: "right-1-1-1",
                                children: [
                                    {
                                        name: "right-1-1-1-1",
                                        leftOnlyKey: "left-1-1-1-1",
                                        rightOnlyKey: "right-1-1-1-1",
                                        children: [],
                                    },
                                    {
                                        name: "right-1-1-1-2",
                                        leftOnlyKey: "left-1-1-1-2",
                                        rightOnlyKey: "right-1-1-1-2",
                                        children: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: "right-1-2",
                        leftOnlyKey: "left-1-2",
                        rightOnlyKey: "right-1-2",
                        children: [],
                    },
                ],
            },
            // @TODO: 2 부터 시작인데 1-2부터 시작하는 거 수정할 것.
            {
                name: "right-1-2",
                leftOnlyKey: "left-1-2",
                rightOnlyKey: "right-1-2",
                children: [
                    {
                        name: "right-1-2-1",
                        leftOnlyKey: "left-1-2-1",
                        rightOnlyKey: "right-1-2-1",
                        children: [
                            {
                                name: "right-1-2-1-1",
                                leftOnlyKey: "left-1-2-1-1",
                                rightOnlyKey: "right-1-2-1-1",
                                children: [],
                            },
                            {
                                name: "right-1-2-1-2",
                                leftOnlyKey: "left-1-2-1-2",
                                rightOnlyKey: "right-1-2-1-2",
                                children: [],
                            },
                        ],
                    },
                    {
                        name: "right-1-2-2",
                        leftOnlyKey: "left-1-2-2",
                        rightOnlyKey: "right-1-2-2",
                        children: [],
                    },
                ],
            },
            {
                name: "right-1-3",
                leftOnlyKey: "left-1-3",
                rightOnlyKey: "right:1-3",
                children: [],
            },
        ];
        const ops = { childrenKey };
        globals.expect(operators_mergeTwoTrees.mergeTwoTrees(ops, leftTree, rightTree)).toEqual(expectedTree);
    });
});
