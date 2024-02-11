type atType = "left" | "right" | number;

interface TOperatorSettings {
  childrenKey: string;
  applyTimesBoundary: [number | string, number | string];
  at?: atType;
  onMoveCursor?: (direction: string, el?: unknown, index?: number) => void;
}

export type { TOperatorSettings, atType };
