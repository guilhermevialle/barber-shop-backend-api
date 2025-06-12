import { Appointment } from "@/domain/entities/appointment.entity";
import { IAppointmentRepository } from "@/infra/interfaces/repositories/appointment-repository.interface";
import { ICustomerRepository } from "@/infra/interfaces/repositories/customer-repository.interface";
import { CustomerNotFoundError } from "../errors/customer-errors";

type Request = { id: string };
type Response = Appointment[] | null;

export class ListCustomerAppointments {
  constructor(
    private readonly customerRepo: ICustomerRepository,
    private readonly appointmentRepo: IAppointmentRepository
  ) {}

  async execute({ id }: Request): Promise<Response> {
    const customer = await this.customerRepo.findById(id);

    if (!customer) throw new CustomerNotFoundError(`Customer ${id} not found`);

    const appointments = await this.appointmentRepo.findManyByCustomer(
      customer.id
    );

    return appointments;
  }
}
