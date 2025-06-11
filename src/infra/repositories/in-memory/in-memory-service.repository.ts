import { Service } from "@/domain/entities/service.entity";
import { IServiceRepository } from "@/infra/interfaces/repositories/service-repository.interface";
import { toCents } from "@/utils/to-cents";

export const serviceTester = Service.create({
  type: "Undercut",
  priceInCents: toCents(30),
  durationInMinutes: 30,
});

export class InMemoryServiceRepository implements IServiceRepository {
  private storage: Service[] = [serviceTester];

  async findAll(): Promise<Service[]> {
    return this.storage;
  }

  async findById(id: string): Promise<Service | null> {
    const service = this.storage.find((service) => service.id === id);

    return service ?? null;
  }

  async save(service: Service): Promise<void> {
    this.storage.push(service);
  }

  async update(service: Service): Promise<void> {
    const index = this.storage.findIndex(
      (service) => service.id === service.id
    );

    if (index === -1) return;

    this.storage[index] = service;
  }

  async clear(): Promise<void> {
    this.storage = [];
  }
}
