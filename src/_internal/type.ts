type atType = "left" | "right" | number;

interface TOperatorConfig {
  childrenKey: string;
  applyTimesBoundary: [number | string, number | string];
  at?: atType;
  onMoveCursor?: (direction: string, el?: unknown, index?: number) => void;
  onBeforeNodeVisit?: (treeNode: unknown, args: unknown) => void;
  onAfterApply?: (treeNode: unknown, args: unknown) => void;
}

export type { TOperatorConfig, atType };
