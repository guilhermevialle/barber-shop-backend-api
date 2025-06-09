import { DomainErrorCode } from "./domain-error-code";
import { DomainError } from "./domain.error";

export class InvalidWorkdayError extends DomainError {
  constructor(message?: string) {
    super({
      message: message ?? "Invalid workday",
      errorCode: DomainErrorCode.INVALID_WORKDAY,
      statusCode: 400,
    });
  }
}

export class MismatchBarberError extends DomainError {
  constructor(message?: string) {
    super({
      message: message ?? "Mismatch barber",
      errorCode: DomainErrorCode.MISMATCH_BARBER,
      statusCode: 400,
    });
  }
}
