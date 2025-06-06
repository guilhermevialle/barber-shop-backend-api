import { DomainError } from "@/domain/errors/domain.error";

export class OverlappingAppointmentError extends DomainError {
  constructor(message?: string) {
    super(message ?? "Overlapping appointment", "OVERLAPPING_APPOINTMENT");
  }
}
