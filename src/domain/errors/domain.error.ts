import { DomainErrorCode } from "./domain-error-code";

interface DomainErrorProps {
  message: string;
  errorCode: DomainErrorCode;
  statusCode?: number;
  details?: unknown;
}

export abstract class DomainError extends Error {
  public readonly props: Required<Omit<DomainErrorProps, "statusCode">> & {
    statusCode: number;
  };

  constructor({
    message,
    errorCode: code,
    statusCode = 400,
    details,
  }: DomainErrorProps) {
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
