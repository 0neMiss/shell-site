export interface CommandMap {
  [key: string]: CommandObjects;
}

export interface CommandObjects {
  description: string;
  onMatch: string;
  flags?: boolean[];
  help?: string;
}
