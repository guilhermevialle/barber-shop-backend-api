import { Appointment } from "@/domain/entities/appointment.entity";
import { IAppointmentRepository } from "@/interfaces/repositories/appointment-repository.interface";
import { addDays, areIntervalsOverlapping } from "date-fns";

export class InMemoryAppointmentRepository implements IAppointmentRepository {
  private storage: Appointment[] = [];

  async findOverlappingAppointmentByBarber(
    barberId: string,
    startAt: Date,
    ignoreId?: string
  ): Promise<Appointment | null> {
    const appointment = this.storage.find(
      (appointment) =>
        appointment.barberId === barberId &&
        appointment.id !== ignoreId &&
        areIntervalsOverlapping(
          { start: startAt, end: addDays(startAt, 30) },
          { start: appointment.startAt, end: appointment.endAt },
          { inclusive: true }
        )
    );

    return appointment ?? null;
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
