import { DomainError } from "@/domain/errors/domain.error";

export class ServiceNotFoundError extends DomainError {
  constructor(message?: string) {
    super(message ?? "Service not found", "SERVICE_NOT_FOUND");
  }
}

export class BarberNotFoundError extends DomainError {
  constructor(message?: string) {
    super(message ?? "Barber not found", "BARBER_NOT_FOUND");
  }
}

export class CustomerNotFoundError extends DomainError {
  constructor(message?: string) {
    super(message ?? "Customer not found", "CUSTOMER_NOT_FOUND");
  }
}
