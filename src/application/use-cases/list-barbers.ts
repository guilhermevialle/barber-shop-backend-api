import { Barber } from "@/domain/aggregates/barber.aggregate";
import { IBarberRepository } from "@/infra/interfaces/repositories/barber-repository.interface";

type Response = Barber[];

export class ListBarbers {
  constructor(private readonly barberRepo: IBarberRepository) {}

  async execute(): Promise<Response> {
    return await this.barberRepo.findAll();
  }
}
