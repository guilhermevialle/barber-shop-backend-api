import { Appointment } from "@/domain/entities/appointment.entity";
import { IAppointmentRepository } from "@/interfaces/repositories/appointment-repository.interface";
import { IServiceRepository } from "@/interfaces/repositories/service-repository.interface";
import { OverlappingAppointmentError } from "../errors/appointment-errors";
import { ServiceNotFoundError } from "../errors/service-errors";

type Request = {
  barberId: string;
  customerId: string;
  startAt: Date;
  serviceId: string;
};

type Response = Appointment;

export class CreateAppointment {
  constructor(
    private readonly appointmentRepo: IAppointmentRepository,
    private readonly serviceRepo: IServiceRepository
  ) {}

  async execute({
    barberId,
    customerId,
    startAt,
    serviceId,
  }: Request): Promise<Response> {
    const overlappingAppointment =
      await this.appointmentRepo.findOverlappingAppointmentByBarber(
        barberId,
        startAt
      );

    if (overlappingAppointment)
      throw new OverlappingAppointmentError(`
       Appointment for barber ${barberId} at ${startAt} already exists
        `);

    const service = await this.serviceRepo.findById(serviceId);

    if (!service)
      throw new ServiceNotFoundError(`Service ${serviceId} not found`);

    const appointment = Appointment.create({
      barberId,
      customerId,
      startAt,
      serviceId,
      durationInMinutes: service.durationInMinutes,
      priceInCents: service.priceInCents,
    });

    return appointment;
  }
}
