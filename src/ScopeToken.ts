export class ScopeToken {
  private key: String;

  constructor(key: string = '') {
    this.key = new String(key);
  }

  public toString() {
    return `ScopeToken(${this.key})`;
  }
}
