/* eslint-disable prettier/prettier */
import { describe, expect, test } from "@jest/globals";

import { insertBesideSiblingBy } from "../operators/insertBesideSiblingBy";

describe("insertBesideSiblingBy", () => {

  describe("객체 삽입" ,() => { 
    test("기본 설정 시, 특정 조건의 형제 노드의 다음 index에 삽입한다.", () => {
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

      const opc = {
        childrenKey,
        // at 기본값이 right  
      };
      const predicate = (node) => node.name === "1-1-1";
      const newNode = { name: "newNode", children: [] };

      expect(
        insertBesideSiblingBy(opc, predicate, newNode, originalNodes),
      ).toEqual(expectedNodes);
    });

    test("형제 노드의 left 삽입 옵션 시, 특정 조건의 형제 노드의 이전 index에 삽입한다.", () => {
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

      const opc = {
        childrenKey,
        at: "left",
      };
      const predicate = (node) => node.name === "1-1-1";
      const newNode = { name: "newNode", children: [] };

      expect(
        insertBesideSiblingBy(opc, predicate, newNode, originalNodes),
      ).toEqual(expectedNodes);
    });

    test("형제 노드의 right 삽입 옵션 시, 특정 조건의 형제 노드의 다음 index에 삽입한다.", () => {
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

      const opc = {
        childrenKey,
        at: "right",
      };
      const predicate = (node) => node.name === "1-1-1";
      const newNode = { name: "newNode", children: [] };

      expect(
        insertBesideSiblingBy(opc, predicate, newNode, originalNodes),
      ).toEqual(expectedNodes);
    });
  });

  describe("배열 삽입" ,() => { 
    test("기본 설정 시, 특정 조건의 형제 노드의 다음 index에 삽입한다.", () => {
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

      const opc = {
        childrenKey,
        // at 기본값이 last
      };
      const predicate = (node) => node.name === "1-1-1";
      const newNodes = [ { name: "newNode-1", children: [] }, { name: "newNode-2", children: [] } ];

      expect(
        insertBesideSiblingBy(opc, predicate, newNodes, originalNodes),
      ).toEqual(expectedNodes);
    });

    test("형제 노드의 left 삽입 옵션 시, 특정 조건의 형제 노드의 이전 inde에 삽입한다.", () => {
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

      const opc = {
        childrenKey,
        at: "left",
      };
      const predicate = (node) => node.name === "1-1-1";
      const newNodes = [{ name: "newNode-1", children: [] }, { name: "newNode-2", children: [] }];

      expect(
        insertBesideSiblingBy(opc, predicate, newNodes, originalNodes),
      ).toEqual(expectedNodes);
    });

    test("형제노드의 right 삽입 옵션 시, 특정 조건의 형제 노드의 이전 inde에 삽입한다.", () => {
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

      const opc = {
        childrenKey,
        at: "right",
      };
      const predicate = (node) => node.name === "1-1-1";
      const newNodes = [{ name: "newNode-1", children: [] }, { name: "newNode-2", children: [] }];

      expect(
        insertBesideSiblingBy(opc, predicate, newNodes, originalNodes),
      ).toEqual(expectedNodes);
    });
  })
});
