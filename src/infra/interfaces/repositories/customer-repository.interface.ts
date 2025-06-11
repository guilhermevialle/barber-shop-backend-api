import { Customer } from "@/domain/entities/customer.entity";

export interface ICustomerRepository {
  save(customer: Customer): Promise<void>;
  update(customer: Customer): Promise<void>;
  findById(id: string): Promise<Customer | null>;
  findByUsername(username: string): Promise<Customer | null>;
  findAll(): Promise<Customer[]>;
  clear(): Promise<void>;
}
