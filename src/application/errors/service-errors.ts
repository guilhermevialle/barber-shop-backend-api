import { ApplicationErrorCode } from "./application-error-code";
import { ApplicationError } from "./application.error";

export class ServiceNotFoundError extends ApplicationError {
  constructor(message?: string) {
    super({
      message: message ?? "Service not found",
      errorCode: ApplicationErrorCode.SERVICE_NOT_FOUND,
      statusCode: 404,
    });
  }
}
