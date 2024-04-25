/* eslint-disable prettier/prettier */
import { describe, expect, test } from "@jest/globals";

import { insertFromParentBy } from "../operators/insertFromParentBy";

describe("insertFromParentBy", () => {

  describe("객체 삽입" ,() => { 
    test("기본 설정 시, 특정 조건의 노드에 대해서, 새로운 자식 노드를 append한다.", () => {
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
                    { name: "newNode", children: [] },
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

      const opc = {
        childrenKey,
        // at 기본값이 last
      };
      const predicate = (node) => node.name === "1-1-1";
      const newNode = { name: "newNode", children: [] };

      expect(
        insertFromParentBy(opc, predicate, newNode, originalNodes),
      ).toEqual(expectedNodes);
    });

    test("at last 시, 특정 조건의 노드에 대해서, 새로운 자식 노드를 prepend한다.", () => {
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
                    { name: "newNode", children: [] },
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

      const opc = {
        childrenKey,
        at: "first",
      };
      const predicate = (node) => node.name === "1-1-1";
      const newNode = { name: "newNode", children: [] };

      expect(
        insertFromParentBy(opc, predicate, newNode, originalNodes),
      ).toEqual(expectedNodes);
    });

    test("단 하나의 parentNode에 대해서만, 새로운 자식 노드를 추가한다.", () => {
      const childrenKey = "children";
      const originalNodes = [
        { name: "target", children: [] },
        { name: "target", children: [] },
        { name: "target", children: [] },
      ];

      const expectedNodes = [
        { name: "target", children: [{ name: "newNode", children: [] }] },
        { name: "target", children: [] },
        { name: "target", children: [] },
      ];

      const opc = {
        childrenKey,
      };
      const predicate = (node) => node.name === "target";
      const newNode = { name: "newNode", children: [] };

      expect(
        insertFromParentBy(opc, predicate, newNode, originalNodes),
      ).toEqual(expectedNodes);
    });

    test("at이 index이면서 정상 범위인 경우, 특정 조건의 노드에 대해서, 새로운 자식 노드를 특정 index에 삽입한다.", () => {
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
                    { name: "newNode", children: [] },
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

      const opc = {
        childrenKey,
        at: 1
      };
      const predicate = (node) => node.name === "1-1-1";
      const newNode = { name: "newNode", children: [] };

      expect(
        insertFromParentBy(opc, predicate, newNode, originalNodes),
      ).toEqual(expectedNodes);
    });

    test("at이 Infinite인 경우, 특정 조건의 노드에 대해서, error를 throw 한다.", () => {
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

      const opc = {
        childrenKey,
        at: Infinity
      };
      const predicate = (node) => node.name === "1-1-1";
      const newNode = { name: "newNode", children: [] };

      expect(()=> 
        insertFromParentBy(opc, predicate, newNode, originalNodes)
      ).toThrow();
    });

    test("새로운 자식 노드 추가를 실패한 경우, error를 throw한다", () => {
      const childrenKey = "children";
      const originalNodes = [
        { name: "non-target", children: [] },
        { name: "non-target", children: [] },
        { name: "non-target", children: [] },
      ];

      const opc = {
        childrenKey,
      };
      const predicate = (node) => node.name === "target";
      const newNode = { name: "newNode", children: [] };
      expect(() =>
        insertFromParentBy(opc, predicate, newNode, originalNodes),
      ).toThrow();
    });


    test("at이 -1인 경우, 특정 조건의 노드에 대해서, error를 throw 한다.", () => {
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

      const opc = {
        childrenKey,
        at: -1
      };
      const predicate = (node) => node.name === "1-1-1";
      const newNode = { name: "newNode", children: [] };

      expect(()=> 
        insertFromParentBy(opc, predicate, newNode, originalNodes)
      ).toThrow();
    });


    test("새로운 자식 노드 추가를 실패한 경우, error를 throw한다", () => {
      const childrenKey = "children";
      const originalNodes = [
        { name: "non-target", children: [] },
        { name: "non-target", children: [] },
        { name: "non-target", children: [] },
      ];

      const opc = {
        childrenKey,
      };
      const predicate = (node) => node.name === "target";
      const newNode = { name: "newNode", children: [] };
      expect(() =>
        insertFromParentBy(opc, predicate, newNode, originalNodes),
      ).toThrow();
    });
  })

  describe("배열 삽입" ,() => { 
    test("기본 설정 시, 특정 조건의 노드에 대해서, 새로운 자식 배열을 append한다.", () => {
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
                    { name: "newNode-1", children: [] },
                    { name: "newNode-2", children: [] },
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

      const opc = {
        childrenKey,
        // at 기본값이 last
      };
      const predicate = (node) => node.name === "1-1-1";
      const newNodes = [ { name: "newNode-1", children: [] }, { name: "newNode-2", children: [] } ];

      expect(
        insertFromParentBy(opc, predicate, newNodes, originalNodes),
      ).toEqual(expectedNodes);
    });

    test("at last 시, 특정 조건의 노드에 대해서, 새로운 자식 배열을 prepend한다.", () => {
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
                    { name: "newNode-1", children: [] },
                    { name: "newNode-2", children: [] },
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

      const opc = {
        childrenKey,
        at: "first",
      };
      const predicate = (node) => node.name === "1-1-1";
      const newNodes = [{ name: "newNode-1", children: [] }, { name: "newNode-2", children: [] }];

      expect(
        insertFromParentBy(opc, predicate, newNodes, originalNodes),
      ).toEqual(expectedNodes);
    });

    test("단 하나의 parentNode에 대해서만, 새로운 자식 배열을 추가한다.", () => {
      const childrenKey = "children";
      const originalNodes = [
        { name: "target", children: [] },
        { name: "target", children: [] },
        { name: "target", children: [] },
      ];

      const expectedNodes = [
        { name: "target", children: [{ name: "newNode-1", children: [] },{ name: "newNode-2", children: [] }] },
        { name: "target", children: [] },
        { name: "target", children: [] },
      ];

      const opc = {
        childrenKey,
      };
      const predicate = (node) => node.name === "target";
      const newNodes = [{ name: "newNode-1", children: [] },{ name: "newNode-2", children: [] }];

      expect(
        insertFromParentBy(opc, predicate, newNodes, originalNodes),
      ).toEqual(expectedNodes);
    });

    test("at이 index이면서 정상 범위인 경우, 특정 조건의 노드에 대해서, 새로운 자식 배열을 특정 index에 삽입한다.", () => {
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
                    { name: "newNode-1", children: [] },
                    { name: "newNode-2", children: [] },
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

      const opc = {
        childrenKey,
        at: 1
      };
      const predicate = (node) => node.name === "1-1-1";
      const newNodes = [{ name: "newNode-1", children: [] },{ name: "newNode-2", children: [] }];

      expect(
        insertFromParentBy(opc, predicate, newNodes, originalNodes),
      ).toEqual(expectedNodes);
    });

    test("at이 Infinite인 경우, 특정 조건의 노드에 대해서, error를 throw 한다.", () => {
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

      const opc = {
        childrenKey,
        at: Infinity
      };
      const predicate = (node) => node.name === "1-1-1";
      const newNode = { name: "newNode", children: [] };

      expect(()=> 
        insertFromParentBy(opc, predicate, newNode, originalNodes)
      ).toThrow();
    });

    test("새로운 자식 노드 추가를 실패한 경우, error를 throw한다", () => {
      const childrenKey = "children";
      const originalNodes = [
        { name: "non-target", children: [] },
        { name: "non-target", children: [] },
        { name: "non-target", children: [] },
      ];

      const opc = {
        childrenKey,
      };
      const predicate = (node) => node.name === "target";
      const newNode = { name: "newNode", children: [] };
      expect(() =>
        insertFromParentBy(opc, predicate, newNode, originalNodes),
      ).toThrow();
    });


    test("at이 -1인 경우, 특정 조건의 노드에 대해서, error를 throw 한다.", () => {
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

      const opc = {
        childrenKey,
        at: -1
      };
      const predicate = (node) => node.name === "1-1-1";
      const newNode = { name: "newNode", children: [] };

      expect(()=> 
        insertFromParentBy(opc, predicate, newNode, originalNodes)
      ).toThrow();
    });


    test("새로운 자식 노드 추가를 실패한 경우, error를 throw한다", () => {
      const childrenKey = "children";
      const originalNodes = [
        { name: "non-target", children: [] },
        { name: "non-target", children: [] },
        { name: "non-target", children: [] },
      ];

      const opc = {
        childrenKey,
      };
      const predicate = (node) => node.name === "target";
      const newNode = { name: "newNode", children: [] };
      expect(() =>
        insertFromParentBy(opc, predicate, newNode, originalNodes),
      ).toThrow();
    });
  })
});
