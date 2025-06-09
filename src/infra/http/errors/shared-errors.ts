import { HttpErrorCode } from "./http-error-code";
import { HttpError } from "./http.error";

export class BadRequestError extends HttpError {
  constructor(message?: string) {
    super({
      message: message ?? "Bad request",
      errorCode: HttpErrorCode.BAD_REQUEST,
      statusCode: 400,
    });
  }
}
