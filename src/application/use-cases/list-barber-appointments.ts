import { Appointment } from "@/domain/entities/appointment.entity";
import { IAppointmentRepository } from "@/infra/interfaces/repositories/appointment-repository.interface";
import { IBarberRepository } from "@/infra/interfaces/repositories/barber-repository.interface";
import { BarberNotFoundError } from "../errors/barber-errors";

type Request = { id: string };
type Response = Appointment[] | null;

export class ListBarberAppointments {
  constructor(
    private readonly BarberRepo: IBarberRepository,
    private readonly appointmentRepo: IAppointmentRepository
  ) {}

  async execute({ id }: Request): Promise<Response> {
    const Barber = await this.BarberRepo.findById(id);

    if (!Barber) throw new BarberNotFoundError(`Barber ${id} not found`);

    const appointments = await this.appointmentRepo.findManyByBarber(Barber.id);

    return appointments;
  }
}
