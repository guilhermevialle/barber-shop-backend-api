import { Barber } from "@/domain/aggregates/barber.aggregate";
import { WorkShift } from "@/domain/entities/work-shift.entity";
import { Workday } from "@/domain/entities/workday.entity";
import { IBarberRepository } from "@/interfaces/repositories/barber-repository.interface";

export class InMemoryBarberRepository implements IBarberRepository {
  private storage: Barber[] = [];

  async findWorkdaysById(id: string): Promise<Workday[]> {
    const barber = this.storage.find((barber) => barber.id === id);

    return barber?.workdays ?? [];
  }

  async findWorkShiftsByWeekdayAndId(
    id: string,
    weekday: number
  ): Promise<WorkShift[]> {
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
