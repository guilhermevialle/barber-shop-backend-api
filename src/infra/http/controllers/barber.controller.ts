import { findBarberAvailabilityDtoSchema } from "@/application/dtos/barber-availability.dto";
import { createBarberDtoSchema } from "@/application/dtos/create-barber.dto";
import { CreateBarber } from "@/application/use-cases/create-barber";
import { FindBarberAvailability } from "@/application/use-cases/find-barber-availability";
import { ListBarbers } from "@/application/use-cases/list-barbers";
import { FastifyReply, FastifyRequest } from "fastify";
import { BadRequestError } from "../errors/shared-errors";

type CustomRequest = FastifyRequest & {
  params: {
    id: string;
  };
  query: {
    date: string;
  };
};

export class BarberController {
  constructor(
    private readonly createBarber: CreateBarber,
    private readonly listBarbers: ListBarbers,
    private readonly findBarberAvailability: FindBarberAvailability
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

  async getBarberAvailability(req: FastifyRequest, reply: FastifyReply) {
    const request = req as CustomRequest;
    const id = request.params.id;
    const date = request.query.date;

    const data = findBarberAvailabilityDtoSchema.safeParse({
      id,
      date,
    });

    if (!data.success) throw new BadRequestError("Invalid request body");

    const availableTimeSlots = await this.findBarberAvailability.execute(
      data.data
    );

    return reply.status(200).send(availableTimeSlots);
  }
}
