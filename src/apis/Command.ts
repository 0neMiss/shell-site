// this might be over-engineering abit
interface CommandI {
  name: string;
  flags: boolean[];
  description?: string;
  helptext?: string;
}

export class Command implements CommandI {
  name: string;
  flags: boolean[];
  constructor(name: string, flags: boolean[]) {
    this.name = name;
    this.flags = flags;
  }
}
