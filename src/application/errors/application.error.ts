import { ApplicationErrorCode } from "./application-error-code";

interface ApplicationErrorProps {
  message: string;
  errorCode: ApplicationErrorCode;
  statusCode?: number;
  details?: unknown;
}

export abstract class ApplicationError extends Error {
  public readonly props: Required<Omit<ApplicationErrorProps, "statusCode">> & {
    statusCode: number;
  };

  constructor({
    message,
    errorCode: code,
    statusCode = 400,
    details,
  }: ApplicationErrorProps) {
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
