'use strict';

var globals = require('@jest/globals');
var operators_filter = require('../operators/filter.js');

globals.describe("filter", () => {
    globals.test("모든 노드를 필터 처리하면, 빈배열을 반환한다.", () => {
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
        const filterFunction = () => false;
        globals.expect(operators_filter.filter(ops, filterFunction, originalNodes)).toEqual([]);
    });
    globals.test("특정 조건의 단말 노드를 필터 처리한다", () => {
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
                                    // {name: '1-1-1-1', children: []},
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
                            // {name: '1-2-1-1', children: []},
                            { name: "1-2-1-2", children: [] },
                        ],
                    },
                    // {name: '1-2-2', children: []},
                ],
            },
            { name: "1-3", children: [] },
        ];
        const ops = { childrenKey };
        const filterFunction = (node) => !["1-1-1-1", "1-2-1-1", "1-2-2"].includes(node.name);
        globals.expect(operators_filter.filter(ops, filterFunction, originalNodes)).toEqual(expectedNodes);
    });
    globals.test("특정 조건의 중간 노드를 필터 처리한다", () => {
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
                    // {name: '1-1', children: [
                    //   {name: '1-1-1', children: [
                    //     {name: '1-1-1-1', children: []},
                    //     {name: '1-1-1-2', children: []},
                    //   ]},
                    //   ]},
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
                    // {name: '1-2-2', children: []},
                ],
            },
            { name: "1-3", children: [] },
        ];
        const ops = { childrenKey };
        const filterFunction = (node) => !["1-1", "1-2-2"].includes(node.name);
        globals.expect(operators_filter.filter(ops, filterFunction, originalNodes)).toEqual(expectedNodes);
    });
    globals.test("특정 조건의 중간 노드를 필터 처리한다", () => {
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
            // {name: '1', children: [
            //   {name: '1-1', children: [
            //     {name: '1-1-1', children: [
            //       {name: '1-1-1-1', children: []},
            //       {name: '1-1-1-2', children: []},
            //     ]},
            //     ]},
            //     {name: '1-1-2', children: []},
            //   ]
            // },
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
            // {name: '1-3', children: []},
        ];
        const ops = { childrenKey };
        const filterFunction = (node) => !["1", "1-3"].includes(node.name);
        globals.expect(operators_filter.filter(ops, filterFunction, originalNodes)).toEqual(expectedNodes);
    });
    globals.test("빈 배열인 경우, 빈 배열을 반환한다.", () => {
        const originalNodes = [];
        const ops = { childrenKey: "children" };
        const filterFunction = () => true;
        globals.expect(operators_filter.filter(ops, filterFunction, originalNodes)).toEqual([]);
    });
});
