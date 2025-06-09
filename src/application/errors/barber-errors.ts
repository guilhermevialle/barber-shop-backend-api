import { ApplicationErrorCode } from "./application-error-code";
import { ApplicationError } from "./application.error";

export class BarberAlreadyExistsError extends ApplicationError {
  constructor(message?: string) {
    super({
      message: message ?? "Barber already exists",
      errorCode: ApplicationErrorCode.BARBER_ALREADY_EXISTS,
      statusCode: 409,
    });
  }
}

export class BarberNotAvailableError extends ApplicationError {
  constructor(message?: string) {
    super({
      message: message ?? "Barber is not available",
      errorCode: ApplicationErrorCode.BARBER_NOT_AVAILABLE,
      statusCode: 409,
    });
  }
}
