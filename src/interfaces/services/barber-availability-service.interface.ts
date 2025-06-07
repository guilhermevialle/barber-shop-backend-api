export interface IBarberAvailabilityService {
  getAvailableTimeSlotsByDate: (
    barberId: string,
    date: Date
  ) => Promise<string[]>;
  isAvailableInRange: (
    barberId: string,
    startAt: Date,
    endAt: Date
  ) => Promise<boolean>;
}
