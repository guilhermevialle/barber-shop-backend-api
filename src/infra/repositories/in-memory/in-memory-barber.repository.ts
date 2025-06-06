import { Barber } from "@/domain/aggregates/barber.aggregate";
import { IBarberRepository } from "@/interfaces/repositories/barber-repository.interface";

export class InMemoryBarberRepository implements IBarberRepository {
  private storage: Barber[] = [];

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
