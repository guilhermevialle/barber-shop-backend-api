import { CreateCustomer } from "@/application/use-cases/create-customer";
import { CustomerController } from "@/infra/http/controllers/customer.controller";
import { InMemoryCustomerRepository } from "@/infra/repositories/in-memory/in-memory-customer.repository";

const customerRepo = new InMemoryCustomerRepository();
const createCustomer = new CreateCustomer(customerRepo);
const customerController = new CustomerController(createCustomer);

export { createCustomer, customerController };
