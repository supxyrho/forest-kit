interface TOperatorSettings {
  childrenKey: string;
  applyTimesBoundary: [number | string, number | string];
  // @TODO: at은 Symbol로 처리한다.
  at?: string | number;
  onMoveCursor?: (direction: string, el?: unknown, index?: number) => void;
}

export type { TOperatorSettings };
