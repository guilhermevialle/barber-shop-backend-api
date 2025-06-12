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

export class CustomerNotFoundError extends ApplicationError {
  constructor(message?: string) {
    super({
      message: message ?? "Customer not found",
      errorCode: ApplicationErrorCode.CUSTOMER_NOT_FOUND,
      statusCode: 404,
    });
  }
}

export class UserNotFoundError extends ApplicationError {
  constructor(message?: string) {
    super({
      message: message ?? "User not found",
      errorCode: ApplicationErrorCode.USER_NOT_FOUND,
      statusCode: 404,
    });
  }
}
