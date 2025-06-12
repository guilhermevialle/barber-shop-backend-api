import { Appointment } from "@/domain/entities/appointment.entity";

export interface IAppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  update(appointment: Appointment): Promise<void>;
  findById(id: string): Promise<Appointment | null>;
  findOverlappingByBarber(
    barberId: string,
    start: Date,
    end: Date,
    options?: {
      inclusive?: boolean;
    }
  ): Promise<Appointment[]>;
  findManyByCustomer(customerId: string): Promise<Appointment[]>;
  findManyByBarber(barberId: string): Promise<Appointment[]>;
  findManyByService(serviceId: string): Promise<Appointment[]>;
  findAll(): Promise<Appointment[]>;
  clear(): Promise<void>;
}
