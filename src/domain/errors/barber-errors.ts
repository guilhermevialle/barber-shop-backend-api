import { DomainError } from "./domain.error";

export class InvalidWorkdayError extends DomainError {
  constructor(message?: string) {
    super(message ?? "Invalid workday.", "INVALID_WORKDAY");
  }
}
