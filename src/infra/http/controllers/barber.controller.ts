import { createBarberDtoSchema } from "@/application/dtos/create-barber.dto";
import { CreateBarber } from "@/application/use-cases/create-barber";
import { FastifyReply, FastifyRequest } from "fastify";
import { BadRequestError } from "../errors/shared-errors";

export class BarberController {
  constructor(private readonly createBarber: CreateBarber) {}

  async create(req: FastifyRequest, reply: FastifyReply) {
    const data = createBarberDtoSchema.safeParse(req.body);

    if (!data.success) throw new BadRequestError("Invalid request body");

    const barber = await this.createBarber.execute({
      ...data.data,
    });

    return reply.status(201).send(barber.toJSON());
  }
}
