import { IBarberAvailabilityService } from "@/application/interfaces/services/barber-availability-service.interface";
import { MIN_DURATION_IN_MINUTES } from "@/domain/types/shared-types/duration.types";
import { Time } from "@/domain/value-objects/time.vo";
import { IAppointmentRepository } from "@/infra/interfaces/repositories/appointment-repository.interface";
import { IBarberRepository } from "@/infra/interfaces/repositories/barber-repository.interface";
import { endOfDay, getDay, startOfDay } from "date-fns";

export class BarberAvailabilityService implements IBarberAvailabilityService {
  constructor(
    private readonly barberRepo: IBarberRepository,
    private readonly appointmentRepo: IAppointmentRepository
  ) {}

  async isAvailableByWeekday(
    barberId: string,
    weekday: number
  ): Promise<boolean> {
    const shifts = await this.barberRepo.findShiftsByWeekday(barberId, weekday);
    return shifts.length > 0;
  }

  async getAvailableTimeSlotsByDate(
    barberId: string,
    date: Date
  ): Promise<string[]> {
    const weekday = getDay(date);
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    const [appointments, shifts] = await Promise.all([
      this.appointmentRepo.findOverlappingAppointmentsByBarber(
        barberId,
        dayStart,
        dayEnd
      ),
      this.barberRepo.findShiftsByWeekday(barberId, weekday),
    ]);

    const slots = shifts.flatMap((shift) => {
      const timeSlots: string[] = [];

      for (
        let time = shift.startTime;
        time.addMinutes(MIN_DURATION_IN_MINUTES).isLessOrEqual(shift.endTime);
        time = time.addMinutes(MIN_DURATION_IN_MINUTES)
      ) {
        const conflict = appointments.some((appointment) =>
          Time.create(appointment.startAt).isEqual(time)
        );

        if (!conflict) {
          timeSlots.push(time.toString());
        } else {
          const conflictingAppointment = appointments.find((appointment) =>
            Time.create(appointment.startAt).isEqual(time)
          );
          if (conflictingAppointment) {
            time = time.addMinutes(
              conflictingAppointment.durationInMinutes - MIN_DURATION_IN_MINUTES
            );
          }
        }
      }

      return timeSlots;
    });

    return slots;
  }

  async isAvailableInDateRange(
    barberId: string,
    startAt: Date,
    endAt: Date
  ): Promise<boolean> {
    const overlappingAppointments =
      await this.appointmentRepo.findOverlappingAppointmentsByBarber(
        barberId,
        startAt,
        endAt,
        { inclusive: false }
      );

    return overlappingAppointments.length === 0;
  }
}
