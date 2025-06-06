import { Appointment } from "@/domain/entities/appointment.entity";

export interface IAppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  update(appointment: Appointment): Promise<void>;
  findById(id: string): Promise<Appointment | null>;
  findOverlappingAppointmentByBarber(
    barberId: string,
    startAt: Date,
    ignoreId?: string
  ): Promise<Appointment | null>;
  findManyByCustomerId(id: string): Promise<Appointment[]>;
  findManyByBarberId(id: string): Promise<Appointment[]>;
  findAll(): Promise<Appointment[]>;
  clear(): Promise<void>;
}
