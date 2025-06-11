import { CustomerAlreadyExistsError } from "@/application/errors/customer-errors";
import { Customer } from "@/domain/entities/customer.entity";
import { Username } from "@/domain/value-objects/username.vo";
import { ICustomerRepository } from "@/infra/interfaces/repositories/customer-repository.interface";
import { CreateCustomerDto } from "../dtos/create-customer.dto";

type Request = CreateCustomerDto;
type Response = Customer;

export class CreateCustomer {
  constructor(private readonly customerRepo: ICustomerRepository) {}

  async execute({ username, name }: Request): Promise<Response> {
    const customerExists = await this.customerRepo.findByUsername(username);

    if (customerExists)
      throw new CustomerAlreadyExistsError(
        `Customer ${username} already exists`
      );

    const customer = Customer.create({
      name,
      username: Username.create(username),
    });

    await this.customerRepo.save(customer);

    return customer;
  }
}
