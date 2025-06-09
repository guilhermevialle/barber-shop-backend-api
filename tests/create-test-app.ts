import { ApplicationError } from "@/application/errors/application.error";
import { DomainError } from "@/domain/errors/domain.error";
import { HttpError } from "@/infra/http/errors/http.error";
import { barberRoutes } from "@/infra/http/routes/barber.routes";
import { errorHandlerPlugin } from "@/main/plugins/error-handler";
import fastify from "fastify";

export async function createTestApp() {
  const app = fastify();

  app.addHook("onError", (request, reply, error, done) => {
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
    done();
  });

  await app.register(errorHandlerPlugin);
  await app.register(barberRoutes);
  await app.ready();

  return app;
}
