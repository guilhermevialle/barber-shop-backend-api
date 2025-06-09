import { barberController } from "@/main/containers/barber.container";
import { FastifyInstance } from "fastify";

export function barberRoutes(app: FastifyInstance) {
  app.post("/barber", barberController.create.bind(barberController));
}
