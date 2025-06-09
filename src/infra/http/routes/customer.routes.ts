import { customerController } from "@/main/containers/customer.container";
import { FastifyInstance } from "fastify";

export function customerRoutes(app: FastifyInstance) {
  app.post("/customer", customerController.create.bind(customerController));
}
