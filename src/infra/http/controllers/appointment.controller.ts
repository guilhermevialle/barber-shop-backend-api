import { createAppointmentDtoSchema } from "@/application/dtos/create-appointment.dto";
import { CreateAppointment } from "@/application/use-cases/create-appointment";
import { FastifyReply, FastifyRequest } from "fastify";
import { BadRequestError } from "../errors/shared-errors";

export class AppointmentController {
  constructor(private readonly createAppointment: CreateAppointment) {}

  async create(req: FastifyRequest, reply: FastifyReply) {
    const data = createAppointmentDtoSchema.safeParse(req.body);

    if (!data.success) throw new BadRequestError("Invalid request body");

    const appointment = await this.createAppointment.execute({
      ...data.data,
    });

    return reply.status(201).send(appointment.toJSON());
  }
}
