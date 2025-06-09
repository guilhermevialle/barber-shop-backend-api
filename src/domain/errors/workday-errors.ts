import { DomainErrorCode } from "./domain-error-code";
import { DomainError } from "./domain.error";

export class MismatchWorkdayError extends DomainError {
  constructor(message?: string) {
    super({
      message: message ?? "Mismatch workday",
      errorCode: DomainErrorCode.MISMATCH_WORKDAY,
      statusCode: 400,
    });
  }
}
