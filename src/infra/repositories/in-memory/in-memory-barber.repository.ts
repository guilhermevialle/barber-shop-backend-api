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
      barber?.workdays.find((workday) => workday.weekday === weekday)
        ?.workShifts ?? []
    );
  }

  async findByUsername(username: string): Promise<Barber | null> {
    const barber = this.storage.find(
      (barber) => barber.username.value === username
    );

    return barber ?? null;
  }

  async findById(id: string): Promise<Barber | null> {
    const customer = this.storage.find((customer) => customer.id === id);

    return customer ?? null;
  }

  async save(customer: Barber): Promise<void> {
    this.storage.push(customer);
  }

  async update(customer: Barber): Promise<void> {
    const index = this.storage.findIndex(
      (customer) => customer.id === customer.id
    );

    if (index === -1) {
      throw new Error("Customer not found");
    }

    this.storage[index] = customer;
  }

  async findAll(): Promise<Barber[]> {
    return this.storage;
  }

  async clear(): Promise<void> {
    this.storage = [];
  }
}
