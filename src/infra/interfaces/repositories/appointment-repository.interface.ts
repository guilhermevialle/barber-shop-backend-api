import { Appointment } from "@/domain/entities/appointment.entity";

export interface IAppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  update(appointment: Appointment): Promise<void>;
  findById(id: string): Promise<Appointment | null>;
  findOverlappingAppointmentsByBarber(
    barberId: string,
    start: Date,
    end: Date,
    options?: {
      inclusive?: boolean;
    }
  ): Promise<Appointment[]>;
  findManyByCustomerId(id: string): Promise<Appointment[]>;
  findManyByBarberId(id: string): Promise<Appointment[]>;
  findAll(): Promise<Appointment[]>;
  clear(): Promise<void>;
}
