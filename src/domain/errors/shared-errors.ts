import { DomainError } from "./domain.error";

export class InvalidTimeError extends DomainError {
  constructor(message?: string) {
    super(message ?? "Invalid time", "INVALID_TIME");
  }
}

export class PastDateError extends DomainError {
  constructor(message?: string) {
    super(message ?? "Date is in the past", "PAST_DATE");
  }
}

export class DateTooLateError extends DomainError {
  constructor(message?: string) {
    super(message ?? "Date is too late", "DATE_TOO_LATE");
  }
}
