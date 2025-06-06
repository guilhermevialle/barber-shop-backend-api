import { Customer } from "@/domain/entities/customer.entity";
import { ICustomerRepositoryInterface } from "@/interfaces/repositories/customer-repository.interface";

export class InMemoryCustomerRepository
  implements ICustomerRepositoryInterface
{
  private storage: Customer[] = [];

  async findById(id: string): Promise<Customer | null> {
    const customer = this.storage.find((customer) => customer.id === id);

    return customer ?? null;
  }

  async findByUsername(username: string): Promise<Customer | null> {
    const customer = this.storage.find(
      (customer) => customer.username.value === username
    );

    return customer ?? null;
  }

  async save(customer: Customer): Promise<void> {
    this.storage.push(customer);
  }

  async update(customer: Customer): Promise<void> {
    const index = this.storage.findIndex(
      (customer) => customer.id === customer.id
    );

    if (index === -1) {
      throw new Error("Customer not found");
    }

    this.storage[index] = customer;
  }

  async findAll(): Promise<Customer[]> {
    return this.storage;
  }

  async clear(): Promise<void> {
    this.storage = [];
  }
}
