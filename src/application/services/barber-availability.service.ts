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

  async isAvailableInTimeRange(
    barberId: string,
    startAt: Date,
    endAt: Date
  ): Promise<boolean> {
    const overlappingAppointments =
      await this.appointmentRepo.findOverlappingByBarber(
        barberId,
        startAt,
        endAt,
        { inclusive: false }
      );

    return overlappingAppointments.length === 0;
  }

  async isWorkingByDate(barberId: string, date: Date): Promise<boolean> {
    const weekday = getDay(date);
    return this.isWorkingByWeekday(barberId, weekday);
  }

  async isWorkingByWeekday(
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
      this.appointmentRepo.findOverlappingByBarber(barberId, dayStart, dayEnd),
      this.barberRepo.findShiftsByWeekday(barberId, weekday),
    ]);

    const bookedSlotsMap = new Map<string, number>(
      appointments.map((app) => [
        Time.create(app.startAt).toString(),
        app.durationInMinutes,
      ])
    );

    const slots: string[] = [];

    for (const shift of shifts) {
      for (
        let time = shift.startTime;
        time.addMinutes(MIN_DURATION_IN_MINUTES).isLessOrEqual(shift.endTime);
        time = time.addMinutes(MIN_DURATION_IN_MINUTES)
      ) {
        const timeStr = time.toString();

        if (!bookedSlotsMap.has(timeStr)) {
          slots.push(timeStr);
        } else {
          const bookedDuration = bookedSlotsMap.get(timeStr)!;
          time = time.addMinutes(bookedDuration - MIN_DURATION_IN_MINUTES);
        }
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
      await this.appointmentRepo.findOverlappingByBarber(
        barberId,
        startAt,
        endAt,
        { inclusive: false }
      );

    return overlappingAppointments.length === 0;
  }
}
