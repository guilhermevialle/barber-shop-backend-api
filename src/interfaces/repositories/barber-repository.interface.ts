import { Barber } from "@/domain/aggregates/barber.aggregate";

export interface IBarberRepository {
  save(customer: Barber): Promise<void>;
  update(customer: Barber): Promise<void>;
  findById(id: string): Promise<Barber | null>;
  findByUsername(username: string): Promise<Barber | null>;
  findAll(): Promise<Barber[]>;
  clear(): Promise<void>;
}
