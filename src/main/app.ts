import { barberRoutes } from "@/infra/http/routes/barber.routes";
import fastify from "fastify";

const app = fastify();

app.register(barberRoutes, { prefix: "/api" });

export { app };
