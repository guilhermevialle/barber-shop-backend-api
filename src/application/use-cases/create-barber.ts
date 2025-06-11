import { CreateBarberDto } from "@/application/dtos/create-barber.dto";
import { BarberAlreadyExistsError } from "@/application/errors/barber-errors";
import { Barber } from "@/domain/aggregates/barber.aggregate";
import { WorkShift } from "@/domain/entities/work-shift.entity";
import { Workday } from "@/domain/entities/workday.entity";
import { idGeneratorService } from "@/domain/services/id-generator.service";
import { Time } from "@/domain/value-objects/time.vo";
import { Username } from "@/domain/value-objects/username.vo";
import { IBarberRepository } from "@/infra/interfaces/repositories/barber-repository.interface";

type Request = CreateBarberDto;
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
      workdays: [],
    });

    workdays.forEach((workday) => {
      const workdayId = idGeneratorService.generateDefault();

      barber.addWorkday(
        Workday.restore({
          id: workdayId,
          barberId: barber.id,
          weekday: workday.weekday,
          shifts: workday.shifts.map((shift) => {
            return WorkShift.restore({
              id: idGeneratorService.generateDefault(),
              workdayId,
              startTime: Time.create(shift.startTime),
              endTime: Time.create(shift.endTime),
            });
          }),
        })
      );
    });

    await this.barberRepo.save(barber);

    return barber;
  }
}
