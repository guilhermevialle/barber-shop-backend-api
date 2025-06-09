import { appointmentRoutes } from "@/infra/http/routes/appointment.routes";
import { barberRoutes } from "@/infra/http/routes/barber.routes";
import { customerRoutes } from "@/infra/http/routes/customer.routes";
import cors from "@fastify/cors";
import fastify from "fastify";
import { appErrorHandler } from "./hooks/error-handler";

const app = fastify();

app.register(cors, { origin: "*" });
app.addHook("onError", appErrorHandler);
app.register(barberRoutes);
app.register(customerRoutes);
app.register(appointmentRoutes);
app.ready();

export { app };
