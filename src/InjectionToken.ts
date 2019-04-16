export class InjectionToken<T> {
  private key: String;

  constructor(key: string = '') {
    this.key = new String(key);
  }
}
