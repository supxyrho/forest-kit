'use strict';

var globals = require('@jest/globals');
var operators_filterManyBy = require('../operators/filterManyBy.js');

globals.describe("filter", () => {
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
        const filterFunction = (node) => ["1", "1-3"].includes(node.name);
        globals.expect(operators_filterManyBy.filterManyBy(ops, filterFunction, originalNodes)).toEqual(expectedNodes);
    });
});
