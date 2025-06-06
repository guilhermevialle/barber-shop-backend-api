import { DomainError } from "@/domain/errors/domain.error";

export class ServiceNotFoundError extends DomainError {
  constructor(message?: string) {
    super(message ?? "Service not found", "SERVICE_NOT_FOUND");
  }
}
