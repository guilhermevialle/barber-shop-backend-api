import { ApplicationErrorCode } from "./application-error-code";
import { ApplicationError } from "./application.error";

export class OverlappingAppointmentError extends ApplicationError {
  constructor(message?: string) {
    super({
      message: message ?? "Overlapping appointment",
      errorCode: ApplicationErrorCode.OVERLAPPING_APPOINTMENT,
      statusCode: 409,
    });
  }
}
