import { ApplicationErrorCode } from "./application-error-code";
import { ApplicationError } from "./application.error";

export class InvalidDateError extends ApplicationError {
  constructor(message?: string) {
    super({
      message: message ?? "Invalid date",
      errorCode: ApplicationErrorCode.INVALID_DATE,
      statusCode: 400,
    });
  }
}
