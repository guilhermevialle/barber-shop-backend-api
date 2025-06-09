import { Time } from "@/domain/value-objects/time.vo";
import { IAppointmentRepository } from "@/interfaces/repositories/appointment-repository.interface";
import { IBarberRepository } from "@/interfaces/repositories/barber-repository.interface";
import { IBarberAvailabilityService } from "@/interfaces/services/barber-availability-service.interface";
import { endOfDay, getDay, startOfDay } from "date-fns";

export class BarberAvailabilityService implements IBarberAvailabilityService {
  constructor(
    private readonly barberRepo: IBarberRepository,
    private readonly appointmentRepo: IAppointmentRepository
  ) {}

  async getAvailableTimeSlotsByDate(
    barberId: string,
    date: Date
  ): Promise<string[]> {
    const weekday = getDay(date);
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    const appointments =
      await this.appointmentRepo.findOverlappingAppointmentsByBarberInRange(
        barberId,
        dayStart,
        dayEnd
      );

    const shifts = await this.barberRepo.findWorkShiftsByWeekdayAndId(
      barberId,
      weekday
    );

    const slots: string[] = [];
    const minSlotDuration = 30;

    for (const shift of shifts) {
      let currentTime = shift.startTime;
      const endTime = shift.endTime;

      while (currentTime.addMinutes(minSlotDuration).isLessOrEqual(endTime)) {
        const hasAppointment = appointments.find((appointment) =>
          Time.create(appointment.startAt).isEqual(currentTime)
        );

        if (hasAppointment) {
          currentTime = currentTime.addMinutes(
            hasAppointment.durationInMinutes
          );
          continue;
        }

        slots.push(currentTime.toString());
        currentTime = currentTime.addMinutes(30);
      }
    }

    return slots;
  }

  async isAvailableInDateRange(
    barberId: string,
    startAt: Date,
    endAt: Date
  ): Promise<boolean> {
    const overlappingAppointments =
      await this.appointmentRepo.findOverlappingAppointmentsByBarberInRange(
        barberId,
        startAt,
        endAt,
        { inclusive: false }
      );

    return overlappingAppointments.length === 0;
  }
}
