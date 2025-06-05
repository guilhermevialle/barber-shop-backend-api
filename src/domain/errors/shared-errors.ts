import { DomainError } from "./domain.error";

export class InvalidTimeError extends DomainError {
  constructor(message?: string) {
    super(message ?? "Invalid time", "INVALID_TIME");
  }
}
