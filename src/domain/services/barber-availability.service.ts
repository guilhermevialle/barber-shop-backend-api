import { IAppointmentRepository } from "@/interfaces/repositories/appointment-repository.interface";
import { IBarberRepository } from "@/interfaces/repositories/barber-repository.interface";
import { IBarberAvailabilityService } from "@/interfaces/services/barber-availability-service.interface";

export class BarberAvailabilityService implements IBarberAvailabilityService {
  constructor(
    private readonly barberRepo: IBarberRepository,
    private readonly appointmentRepo: IAppointmentRepository
  ) {}

  async isAvailableInRange(barberId: string, startAt: Date, endAt: Date) {
    const overlappingAppointments =
      await this.appointmentRepo.findOverlappingAppointmentsByBarberInRange(
        barberId,
        startAt,
        endAt
      );

    return overlappingAppointments.length === 0;
  }
}
