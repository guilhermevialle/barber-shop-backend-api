import { createBarberDtoSchema } from "@/application/dtos/create-barber.dto";
import { CreateBarber } from "@/application/use-cases/create-barber";
import { ListBarbers } from "@/application/use-cases/list-barbers";
import { FastifyReply, FastifyRequest } from "fastify";
import { BadRequestError } from "../errors/shared-errors";

export class BarberController {
  constructor(
    private readonly createBarber: CreateBarber,
    private readonly listBarbers: ListBarbers
  ) {}

  async create(req: FastifyRequest, reply: FastifyReply) {
    const data = createBarberDtoSchema.safeParse(req.body);

    if (!data.success) throw new BadRequestError("Invalid request body");

    const barber = await this.createBarber.execute({
      ...data.data,
    });

    return reply.status(201).send(barber.toJSON());
  }

  async getBarberList(req: FastifyRequest, reply: FastifyReply) {
    const barbers = await this.listBarbers.execute();

    return reply.status(200).send(barbers.map((barber) => barber.toJSON()));
  }
}
