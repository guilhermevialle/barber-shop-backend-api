export interface IBarberAvailabilityService {
  getAvailableTimeSlotsByDate: (
    barberId: string,
    date: Date
  ) => Promise<string[]>;
  isAvailableInDateRange: (
    barberId: string,
    startAt: Date,
    endAt: Date
  ) => Promise<boolean>;
}
