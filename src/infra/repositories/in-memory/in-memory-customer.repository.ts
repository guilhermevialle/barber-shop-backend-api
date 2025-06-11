import { Customer } from "@/domain/entities/customer.entity";
import { Username } from "@/domain/value-objects/username.vo";
import { ICustomerRepository } from "@/infra/interfaces/repositories/customer-repository.interface";

export const customerTester = Customer.create({
  name: "Customer for Tests",
  username: Username.create("customer_for_tests"),
});

export class InMemoryCustomerRepository implements ICustomerRepository {
  private storage: Customer[] = [customerTester];

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
