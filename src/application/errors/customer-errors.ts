import { ApplicationError } from "./application.error";

export class CustomerAlreadyExistsError extends ApplicationError {
  constructor(message?: string) {
    super(
      message ?? "Customer already exists",
      "CUSTOMER_ALREADY_EXISTS_ERROR"
    );
  }
}
