export interface IBarberAvailabilityService {
  isAvailableInRange: (
    barberId: string,
    startAt: Date,
    endAt: Date
  ) => Promise<boolean>;
}
