import { HttpErrorCode } from "./http-error-code";

interface HttpErrorProps {
  message: string;
  errorCode: HttpErrorCode;
  statusCode?: number;
  details?: unknown;
}

export abstract class HttpError extends Error {
  public readonly props: Required<Omit<HttpErrorProps, "statusCode">> & {
    statusCode: number;
  };

  constructor({
    message,
    errorCode: code,
    statusCode = 400,
    details,
  }: HttpErrorProps) {
    super(message);
    this.name = new.target.name;

    this.props = {
      message,
      errorCode: code,
      statusCode,
      details,
    };

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
