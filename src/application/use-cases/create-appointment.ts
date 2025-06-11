import { CreateAppointmentDto } from "@/application/dtos/create-appointment.dto";
import {
  BarberNotAvailableError,
  BarberNotFoundError,
} from "@/application/errors/barber-errors";
import { ServiceNotFoundError } from "@/application/errors/service-errors";
import { IBarberAvailabilityService } from "@/application/interfaces/services/barber-availability-service.interface";
import { Appointment } from "@/domain/entities/appointment.entity";
import { IAppointmentRepository } from "@/infra/interfaces/repositories/appointment-repository.interface";
import { IBarberRepository } from "@/infra/interfaces/repositories/barber-repository.interface";
import { ICustomerRepository } from "@/infra/interfaces/repositories/customer-repository.interface";
import { IServiceRepository } from "@/infra/interfaces/repositories/service-repository.interface";
import { addMinutes } from "date-fns";
import { CustomerNotFoundError } from "../errors/customer-errors";

type Request = CreateAppointmentDto;
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
      await this.barberAvailabilityService.isAvailableInDateRange(
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
