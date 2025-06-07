export interface IBarberAvailabilityService {
  getAvailableTimeSlotsByWeekday: (
    barberId: string,
    weekday: number
  ) => Promise<string[]>;
  isAvailableInRange: (
    barberId: string,
    startAt: Date,
    endAt: Date
  ) => Promise<boolean>;
}
