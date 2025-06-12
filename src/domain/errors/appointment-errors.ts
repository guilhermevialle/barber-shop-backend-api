import { AppointmentStatus } from "../types/entity-types/appointment.types";
import { DomainErrorCode } from "./domain-error-code";
import { DomainError } from "./domain.error";

export class AppointmentAlreadyConfirmedError extends DomainError {
  constructor(message?: string) {
    super({
      message: message ?? "Appointment is already confirmed",
      errorCode: DomainErrorCode.APPOINTMENT_ALREADY_CONFIRMED,
      statusCode: 400,
    });
  }
}

export class AppointmentTooCloseError extends DomainError {
  constructor(message?: string) {
    super({
      message: message ?? "Appointment is too close",
      errorCode: DomainErrorCode.APPOINTMENT_TOO_CLOSE,
      statusCode: 400,
    });
  }
}

export class AppointmentAlreadyCancelledError extends DomainError {
  constructor(message?: string) {
    super({
      message: message ?? "Appointment is already cancelled",
      errorCode: DomainErrorCode.APPOINTMENT_ALREADY_CANCELLED,
      statusCode: 400,
    });
  }
}

export class AppointmentAlreadyExpiredError extends DomainError {
  constructor(message?: string) {
    super({
      message: message ?? "Appointment is already expired",
      errorCode: DomainErrorCode.APPOINTMENT_ALREADY_EXPIRED,
      statusCode: 400,
    });
  }
}

export class AppointmentAlreadyFinishedError extends DomainError {
  constructor(message?: string) {
    super({
      message: message ?? "Appointment is already finished",
      errorCode: DomainErrorCode.APPOINTMENT_ALREADY_FINISHED,
      statusCode: 400,
    });
  }
}

const StatusErrorMap: Record<AppointmentStatus, () => Error> = {
  [AppointmentStatus.FINISHED]: () => new AppointmentAlreadyFinishedError(),
  [AppointmentStatus.CANCELLED]: () => new AppointmentAlreadyCancelledError(),
  [AppointmentStatus.EXPIRED]: () => new AppointmentAlreadyExpiredError(),
  [AppointmentStatus.CONFIRMED]: () => new AppointmentAlreadyConfirmedError(),
};

export const getStatusError = (status: AppointmentStatus) =>
  StatusErrorMap[status];
