import { ApplicationErrorCode } from "./application-error-code";
import { ApplicationError } from "./application.error";

export class CustomerAlreadyExistsError extends ApplicationError {
  constructor(message?: string) {
    super({
      message: message ?? "Customer already exists",
      errorCode: ApplicationErrorCode.CUSTOMER_ALREADY_EXISTS,
      statusCode: 409,
    });
  }
}
