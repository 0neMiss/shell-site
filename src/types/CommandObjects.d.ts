export interface CommandMap {
  [key: string]: CommandObjects;
}

export interface CommandObjects {
  outputText?: string;
  onMatch?: string;
  flags?: boolean[];
  help?: string;
}
