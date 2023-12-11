export class CommandHistory implements CommandHistory {
  private history: string[] = [];
  private _current: string = "";
  private _pointer: number = 0;
  private _enabled: boolean = false;

  constructor(history: string[]) {
    this.history = history;
  }

  set enabled(enabled: boolean) {
    this._enabled = enabled;
  }
  set pointer(pointer: number) {
    this._pointer = pointer;
  }

  get pointer() {
    return this._pointer;
  }
  get enabled() {
    return this._enabled;
  }
  get current() {
    return this._current;
  }

  public next() {
    if (this._pointer! >= this.history.length) {
      this._pointer += 1;
      this._current = this.history[this.pointer];
    }
  }
  public prev() {
    if (this._pointer! <= 0) {
      this._pointer -= 1;
      this._current = this.history[this.pointer];
    }
  }
  public resetHistoryState() {
    this.enabled = false;
    this._pointer = 0;
  }
  public add(command: string) {
    this.history.unshift(command);
  }
  public clearHistory() {
    this.history = [];
  }
}
