import { Service } from "@/domain/entities/service.entity";
import { IServiceRepository } from "@/interfaces/repositories/service-repository.interface";

export class InMemoryServiceRepository implements IServiceRepository {
  private storage: Service[] = [];

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
