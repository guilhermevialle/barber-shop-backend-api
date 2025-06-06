import { ApplicationError } from "./application.error";

export class BarberAlreadyExistsError extends ApplicationError {
  constructor(message?: string) {
    super(message ?? "Barber already exists", "BARBER_ALREADY_EXISTS_ERROR");
  }
}
