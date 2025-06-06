import { Barber } from "@/domain/aggregates/barber.aggregate";
import { Workday } from "@/domain/entities/workday.entity";
import { Username } from "@/domain/value-objects/username.vo";
import { IBarberRepository } from "@/interfaces/repositories/barber-repository.interface";
import { BarberAlreadyExistsError } from "../errors/barber-errors";

type Request = {
  name: string;
  username: string;
  workdays: Workday[];
};

type Response = Barber;

export class CreateBarber {
  constructor(private readonly barberRepo: IBarberRepository) {}

  async execute({ username, name, workdays }: Request): Promise<Response> {
    const barberExists = await this.barberRepo.findByUsername(username);

    if (barberExists)
      throw new BarberAlreadyExistsError(`Barber ${username} already exists`);

    const barber = Barber.create({
      name,
      username: Username.create(username),
      workdays,
    });

    await this.barberRepo.save(barber);

    return barber;
  }
}
