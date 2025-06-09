import { FastifyError, FastifyInstance, FastifyPluginAsync } from "fastify";

export const errorHandlerPlugin: FastifyPluginAsync = async (
  app: FastifyInstance
) => {
  app.setErrorHandler((error: FastifyError, request, reply) => {});
};
