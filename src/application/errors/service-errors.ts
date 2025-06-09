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

export class BarberNotFoundError extends ApplicationError {
  constructor(message?: string) {
    super({
      message: message ?? "Barber not found",
      errorCode: ApplicationErrorCode.BARBER_NOT_FOUND,
      statusCode: 404,
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
