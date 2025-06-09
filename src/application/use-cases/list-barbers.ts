import { IBarberRepository } from "@/interfaces/repositories/barber-repository.interface";

export class ListBarbers {
  constructor(private readonly barberRepo: IBarberRepository) {}

  async execute() {
    return await this.barberRepo.findAll();
  }
}
