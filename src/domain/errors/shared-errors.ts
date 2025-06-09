import { DomainErrorCode } from "./domain-error-code";
import { DomainError } from "./domain.error";

export class InvalidTimeError extends DomainError {
  constructor(message?: string) {
    super({
      message: message ?? "Invalid time",
      errorCode: DomainErrorCode.INVALID_TIME,
      statusCode: 400,
    });
  }
}

export class PastDateError extends DomainError {
  constructor(message?: string) {
    super({
      message: message ?? "Date is in the past",
      errorCode: DomainErrorCode.PAST_DATE,
      statusCode: 400,
    });
  }
}

export class DateTooLateError extends DomainError {
  constructor(message?: string) {
    super({
      message: message ?? "Date is too late",
      errorCode: DomainErrorCode.DATE_TOO_LATE,
      statusCode: 400,
    });
  }
}
