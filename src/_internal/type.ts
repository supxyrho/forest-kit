type atType = "left" | "right" | number;

interface TOperatorConfig {
  childrenKey: string;
  applyTimesBoundary: [number | string, number | string];
  at?: atType;
  onMoveCursor?: (direction: string, el?: unknown, index?: number) => void;
}

export type { TOperatorConfig, atType };
