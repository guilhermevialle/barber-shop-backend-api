export abstract class HttpError extends Error {
  public readonly httpCode: number;
  public readonly errorCode: string;

  constructor(message: string, httpCode: number, errorCode?: string) {
    super(message);
    this.name = new.target.name;
    this.httpCode = httpCode;
    this.errorCode = errorCode ?? new.target.name;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, this.constructor);
  }

  toJSON() {
    return {
      error: this.name,
      message: this.message,
      code: this.errorCode,
      status: this.httpCode,
    };
  }
}

export class BadRequestError extends HttpError {
  constructor(message?: string) {
    super(message ?? "Bad request", 400, "BAD_REQUEST_ERROR");
  }
}
