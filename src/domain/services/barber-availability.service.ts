import { IAppointmentRepository } from "@/interfaces/repositories/appointment-repository.interface";
import { IBarberRepository } from "@/interfaces/repositories/barber-repository.interface";
import { IBarberAvailabilityService } from "@/interfaces/services/barber-availability-service.interface";
import { endOfDay, getDay, startOfDay } from "date-fns";
import { Time } from "../value-objects/time.vo";

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

    const workShifts = await this.barberRepo.findWorkShiftsByWeekdayAndId(
      barberId,
      weekday
    );

    const slots: string[] = [];
    const minimumSlotDuration = 30;

    for (const workShift of workShifts) {
      let current = workShift.startTime;
      const end = workShift.endTime;

      while (current.addMinutes(minimumSlotDuration).isLessOrEqual(end)) {
        const hasAppointment = appointments.find((appointment) =>
          Time.create(appointment.startAt).isEqual(current)
        );

        if (hasAppointment) {
          current = current.addMinutes(hasAppointment.durationInMinutes);
          continue;
        }

        slots.push(current.toString());
        current = current.addMinutes(30);
      }
    }

    return slots;
  }

  async isAvailableInRange(barberId: string, startAt: Date, endAt: Date) {
    const overlappingAppointments =
      await this.appointmentRepo.findOverlappingAppointmentsByBarberInRange(
        barberId,
        startAt,
        endAt,
        { inclusive: false }
      );

    console.log(overlappingAppointments);

    return overlappingAppointments.length === 0;
  }
}
