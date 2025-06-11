import { Appointment } from "@/domain/entities/appointment.entity";
import { IAppointmentRepository } from "@/infra/interfaces/repositories/appointment-repository.interface";
import { areIntervalsOverlapping } from "date-fns";

export class InMemoryAppointmentRepository implements IAppointmentRepository {
  private storage: Appointment[] = [];

  async findOverlappingAppointmentsByBarber(
    barberId: string,
    start: Date,
    end: Date,
    options: { inclusive?: boolean } = { inclusive: true }
  ): Promise<Appointment[]> {
    return this.storage.filter((appointment) => {
      return (
        appointment.barberId === barberId &&
        areIntervalsOverlapping(
          { start, end },
          { start: appointment.startAt, end: appointment.endAt },
          { inclusive: options.inclusive }
        )
      );
    });
  }

  async clear(): Promise<void> {
    this.storage = [];
  }

  async findAll(): Promise<Appointment[]> {
    return this.storage;
  }

  async findById(id: string): Promise<Appointment | null> {
    const appointment = this.storage.find(
      (appointment) => appointment.id === id
    );

    return appointment ?? null;
  }

  async findManyByBarberId(id: string): Promise<Appointment[]> {
    return this.storage.filter((appointment) => appointment.barberId === id);
  }

  async findManyByCustomerId(id: string): Promise<Appointment[]> {
    return this.storage.filter((appointment) => appointment.customerId === id);
  }

  async save(appointment: Appointment): Promise<void> {
    this.storage.push(appointment);
  }

  async update(appointment: Appointment): Promise<void> {
    const index = this.storage.findIndex(
      (appointment) => appointment.id === appointment.id
    );

    if (index === -1) return;

    this.storage[index] = appointment;
  }
}
