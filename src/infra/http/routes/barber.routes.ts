// src/infra/http/routes/barber.routes.ts

import { barberController } from "@/main/containers/barber.container";
import { FastifyInstance } from "fastify";

export async function barberRoutes(app: FastifyInstance) {
  app.post("/barber", barberController.create.bind(barberController));
}
