import { barberRoutes } from "@/infra/http/routes/barber.routes";
import fastify from "fastify";

export async function createTestApp() {
  const app = fastify();
  await app.register(barberRoutes);
  await app.ready();
  return app;
}
