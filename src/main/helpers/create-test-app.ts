import { appointmentRoutes } from "@/infra/http/routes/appointment.routes";
import { barberRoutes } from "@/infra/http/routes/barber.routes";
import { customerRoutes } from "@/infra/http/routes/customer.routes";
import { appErrorHandler } from "@/main/hooks/error-handler";
import fastify from "fastify";

export async function createTestApp() {
  const app = fastify();
  app.addHook("onError", appErrorHandler);
  await app.register(barberRoutes);
  await app.register(customerRoutes);
  await app.register(appointmentRoutes);
  await app.ready();
  return app;
}
