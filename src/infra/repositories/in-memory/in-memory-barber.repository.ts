import { Barber } from "@/domain/aggregates/barber.aggregate";
import { WorkShift } from "@/domain/entities/work-shift.entity";
import { WorkdayFactory } from "@/domain/helpers/workday-factory";
import { idGeneratorService } from "@/domain/services/id-generator.service";
import { Username } from "@/domain/value-objects/username.vo";
import { IBarberRepository } from "@/infra/interfaces/repositories/barber-repository.interface";

export const barberTester = Barber.create({
  name: "Barber for Tests",
  username: Username.create("barber_for_tests"),
  workdays: [],
});

barberTester.addWorkdays(
  new WorkdayFactory(idGeneratorService).createMany({
    barberId: barberTester.id,
    between: [0, 6],
    shifts: [
      {
        startTime: "08:00",
        endTime: "12:00",
      },
      {
        startTime: "13:00",
        endTime: "17:30",
      },
    ],
  })
);

export class InMemoryBarberRepository implements IBarberRepository {
  private storage: Barber[] = [barberTester];

  async findShiftsByWeekday(id: string, weekday: number): Promise<WorkShift[]> {
    const barber = this.storage.find((barber) => barber.id === id);

    return (
      barber?.workdays.find((workday) => workday.weekday === weekday)?.shifts ??
      []
    );
  }

  async findByUsername(username: string): Promise<Barber | null> {
    const barber = this.storage.find(
      (barber) => barber.username.value === username
    );

    return barber ?? null;
  }

  async findById(id: string): Promise<Barber | null> {
    const barber = this.storage.find((barber) => barber.id === id);

    return barber ?? null;
  }

  async save(barber: Barber): Promise<void> {
    this.storage.push(barber);
  }

  async update(barber: Barber): Promise<void> {
    const index = this.storage.findIndex((barber) => barber.id === barber.id);

    if (index === -1) {
      throw new Error("barber not found");
    }

    this.storage[index] = barber;
  }

  async findAll(): Promise<Barber[]> {
    return this.storage;
  }

  async clear(): Promise<void> {
    this.storage = [];
  }
}
