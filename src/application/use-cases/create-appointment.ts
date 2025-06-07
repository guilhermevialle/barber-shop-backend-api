import { Appointment } from "@/domain/entities/appointment.entity";
import { IAppointmentRepository } from "@/interfaces/repositories/appointment-repository.interface";
import { IBarberRepository } from "@/interfaces/repositories/barber-repository.interface";
import { ICustomerRepository } from "@/interfaces/repositories/customer-repository.interface";
import { IServiceRepository } from "@/interfaces/repositories/service-repository.interface";
import { IBarberAvailabilityService } from "@/interfaces/services/barber-availability-service.interface";
import { addMinutes } from "date-fns";
import { BarberNotAvailableError } from "../errors/barber-errors";
import {
  BarberNotFoundError,
  CustomerNotFoundError,
  ServiceNotFoundError,
} from "../errors/service-errors";

type Request = {
  barberId: string;
  customerId: string;
  serviceId: string;
  startAt: Date;
};

type Response = Appointment;

export class CreateAppointment {
  constructor(
    private readonly barberRepo: IBarberRepository,
    private readonly customerRepo: ICustomerRepository,
    private readonly serviceRepo: IServiceRepository,
    private readonly appointmentRepo: IAppointmentRepository,
    private readonly barberAvailabilityService: IBarberAvailabilityService
  ) {}

  async execute({
    barberId,
    customerId,
    serviceId,
    startAt,
  }: Request): Promise<Response> {
    const service = await this.serviceRepo.findById(serviceId);

    if (!service)
      throw new ServiceNotFoundError(`Service ${serviceId} not found`);

    const barber = await this.barberRepo.findById(barberId);

    if (!barber) throw new BarberNotFoundError(`Barber ${barberId} not found`);

    const customer = await this.customerRepo.findById(customerId);

    if (!customer)
      throw new CustomerNotFoundError(`Customer ${customerId} not found`);

    const barberIsAvailable =
      await this.barberAvailabilityService.isAvailableInRange(
        barberId,
        startAt,
        addMinutes(startAt, service.durationInMinutes)
      );

    if (!barberIsAvailable)
      throw new BarberNotAvailableError(
        "Barber is not available in the selected time slot"
      );

    const appointment = Appointment.create({
      barberId,
      customerId,
      serviceId,
      startAt,
      durationInMinutes: service.durationInMinutes,
      priceInCents: service.priceInCents,
    });

    await this.appointmentRepo.save(appointment);

    return appointment;
  }
}
