import { Appointment } from "@/domain/entities/appointment.entity";
import { IAppointmentRepository } from "@/interfaces/repositories/appointment-repository.interface";
import { IServiceRepository } from "@/interfaces/repositories/service-repository.interface";
import { IBarberAvailabilityService } from "@/interfaces/services/barber-availability-service.interface";
import { addMinutes } from "date-fns";
import { BarberNotAvailableError } from "../errors/barber-errors";
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
    private readonly serviceRepo: IServiceRepository,
    private readonly barberAvailabilityService: IBarberAvailabilityService
  ) {}

  async execute({
    barberId,
    customerId,
    startAt,
    serviceId,
  }: Request): Promise<Response> {
    const service = await this.serviceRepo.findById(serviceId);

    if (!service)
      throw new ServiceNotFoundError(`Service ${serviceId} not found`);

    const isBarberAvailable =
      await this.barberAvailabilityService.isAvailableInRange(
        barberId,
        startAt,
        addMinutes(startAt, service.durationInMinutes)
      );

    if (!isBarberAvailable)
      throw new BarberNotAvailableError(`Barber not available this time.`);

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
