import { ApplicationError } from "@/application/errors/application.error";
import { DomainError } from "@/domain/errors/domain.error";
import { HttpError } from "@/infra/http/errors/http.error";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export const appErrorHandler = (
  request: FastifyRequest,
  reply: FastifyReply,
  error: FastifyError
) => {
  if (
    error instanceof DomainError ||
    error instanceof ApplicationError ||
    error instanceof HttpError
  ) {
    return reply.status(error.props.statusCode).send({
      error: error.name,
      message: error.message,
      code: error.props.errorCode,
    });
  }

  reply.status(500).send({
    error: "InternalServerError",
    message: "Internal server error",
    code: "INTERNAL_SERVER_ERROR",
  });
};
