export abstract class ApplicationError extends Error {
  public readonly code: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = new.target.name;
    this.code = code ?? new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
