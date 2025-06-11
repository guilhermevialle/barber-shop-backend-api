import { IBarberAvailabilityService } from "@/application/interfaces/services/barber-availability-service.interface";
import { IBarberRepository } from "@/infra/interfaces/repositories/barber-repository.interface";
import { isPast } from "date-fns";
import { BarberNotFoundError } from "../errors/barber-errors";
import { InvalidDateError } from "../errors/shared-errors";

type Request = {
  id: string;
  date: Date;
};

type Response = string[];

export class FindBarberAvailability {
  constructor(
    private readonly barberRepo: IBarberRepository,
    private readonly barberAvailabilityService: IBarberAvailabilityService
  ) {}

  async execute({ date, id }: Request): Promise<Response> {
    const barber = await this.barberRepo.findById(id);

    if (!barber) throw new BarberNotFoundError(`Barber ${id} not found`);

    if (isPast(date)) throw new InvalidDateError("Date must be in the future");

    const availableTimeSlots =
      await this.barberAvailabilityService.getAvailableTimeSlotsByDate(
        barber.id,
        date
      );

    return availableTimeSlots;
  }
}
