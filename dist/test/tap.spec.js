'use strict';

var globals = require('@jest/globals');
var operators_tap = require('../operators/tap.js');

const R = require("ramda");
globals.describe("tap", () => {
    globals.test("각각의 노드에 대해서, 콜백 함수를 호출한다.", () => {
        const childrenKey = "children";
        const originalNodes = [
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
        const ops = { childrenKey };
        const callback = globals.jest.fn(R.identity);
        operators_tap.tap(ops, callback, originalNodes);
        globals.expect(callback).toHaveBeenCalledTimes(12);
    });
});
