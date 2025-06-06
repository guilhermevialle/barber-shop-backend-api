import { Service } from "@/domain/entities/service.entity";

export interface IServiceRepository {
  save(service: Service): Promise<void>;
  update(service: Service): Promise<void>;
  findById(id: string): Promise<Service | null>;
  findAll(): Promise<Service[]>;
  clear(): Promise<void>;
}
