export class InjectionToken<T> {
  private key: String;

  constructor(key: string = '') {
    this.key = new String(key);
  }

  public toString() {
    return `InjectionToken(${this.key})`;
  }
}
