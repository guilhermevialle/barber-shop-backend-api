import { createCustomerDtoSchema } from "@/application/dtos/create-customer.dto";
import { CreateCustomer } from "@/application/use-cases/create-customer";
import { FastifyReply, FastifyRequest } from "fastify";
import { BadRequestError } from "../errors/shared-errors";

export class CustomerController {
  constructor(private readonly createCustomer: CreateCustomer) {}

  async create(req: FastifyRequest, reply: FastifyReply) {
    const data = createCustomerDtoSchema.safeParse(req.body);

    if (!data.success) throw new BadRequestError("Invalid request body");

    const customer = await this.createCustomer.execute({
      ...data.data,
    });

    return reply.status(201).send(customer.toJSON());
  }
}
