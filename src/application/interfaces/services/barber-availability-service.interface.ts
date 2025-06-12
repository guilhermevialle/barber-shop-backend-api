export interface IBarberAvailabilityService {
  isAvailableInTimeRange(
    barberId: string,
    startAt: Date,
    endAt: Date
  ): Promise<boolean>;
  isWorkingByDate: (barberId: string, date: Date) => Promise<boolean>;
  isWorkingByWeekday: (barberId: string, weekday: number) => Promise<boolean>;
  getAvailableTimeSlotsByDate: (
    barberId: string,
    date: Date
  ) => Promise<string[]>;
}
