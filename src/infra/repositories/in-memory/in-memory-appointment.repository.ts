import { Appointment } from "@/domain/entities/appointment.entity";
import { IAppointmentRepository } from "@/infra/interfaces/repositories/appointment-repository.interface";
import { areIntervalsOverlapping } from "date-fns";

export class InMemoryAppointmentRepository implements IAppointmentRepository {
  private storage: Appointment[] = [];

  async findCancelledByBarber(barberId: string): Promise<Appointment[]> {
    return this.storage.filter(
      (appointment) =>
        appointment.barberId === barberId && appointment.isCancelled
    );
  }

  async findConfirmedByBarber(barberId: string): Promise<Appointment[]> {
    return this.storage.filter(
      (appointment) =>
        appointment.barberId === barberId && !appointment.isConfirmed
    );
  }

  async findExpiredByBarber(barberId: string): Promise<Appointment[]> {
    return this.storage.filter(
      (appointment) =>
        appointment.barberId === barberId && !appointment.isExpired
    );
  }

  async findFinishedByBarber(barberId: string): Promise<Appointment[]> {
    return this.storage.filter(
      (appointment) =>
        appointment.barberId === barberId && !appointment.isFinished
    );
  }

  async findCancelledByCustomer(customerId: string): Promise<Appointment[]> {
    return this.storage.filter(
      (appointment) =>
        appointment.customerId === customerId && appointment.isCancelled
    );
  }

  async findConfirmedByCustomer(customerId: string): Promise<Appointment[]> {
    return this.storage.filter(
      (appointment) =>
        appointment.customerId === customerId && !appointment.isConfirmed
    );
  }

  async findExpiredByCustomer(customerId: string): Promise<Appointment[]> {
    return this.storage.filter(
      (appointment) =>
        appointment.customerId === customerId && !appointment.isExpired
    );
  }

  async findFinishedByCustomer(customerId: string): Promise<Appointment[]> {
    return this.storage.filter(
      (appointment) =>
        appointment.customerId === customerId && !appointment.isFinished
    );
  }

  async findManyByService(serviceId: string): Promise<Appointment[]> {
    return this.storage.filter(
      (appointment) => appointment.serviceId === serviceId
    );
  }

  async findOverlappingByBarber(
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

  async findById(id: string): Promise<Appointment | null> {
    const appointment = this.storage.find(
      (appointment) => appointment.id === id
    );

    return appointment ?? null;
  }

  async findManyByBarber(barberId: string): Promise<Appointment[]> {
    return this.storage.filter(
      (appointment) => appointment.barberId === barberId
    );
  }

  async findManyByCustomer(customerId: string): Promise<Appointment[]> {
    return this.storage.filter(
      (appointment) => appointment.customerId === customerId
    );
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

  async clear(): Promise<void> {
    this.storage = [];
  }

  async findAll(): Promise<Appointment[]> {
    return this.storage;
  }
}
