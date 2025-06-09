import { appointmentController } from "@/main/containers/appointment.container";
import { FastifyInstance } from "fastify";

export function appointmentRoutes(app: FastifyInstance) {
  app.post(
    "/appointment",
    appointmentController.create.bind(appointmentController)
  );
}
