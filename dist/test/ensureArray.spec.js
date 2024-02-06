'use strict';

var globals = require('@jest/globals');
var operators_ensureArray = require('../operators/ensureArray.js');

globals.describe("ensureArray", () => {
    globals.test("undefined인 경우, 빈 배열을 반환한다.", () => {
        globals.expect(operators_ensureArray.ensureArray(undefined)).toEqual([]);
    });
    globals.test("Array인 경우, 그대로 반환한다.", () => {
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
        globals.expect(operators_ensureArray.ensureArray(originalNodes)).toEqual(originalNodes);
    });
    globals.test("Object 타입인 경우, Array로 래핑 후 반환한다.", () => {
        const originalNode = { name: "something", children: [] };
        globals.expect(operators_ensureArray.ensureArray(originalNode)).toEqual([originalNode]);
    });
});
