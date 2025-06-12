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
  findCancelledByCustomer(customerId: string): Promise<Appointment[]>;
  findConfirmedByCustomer(customerId: string): Promise<Appointment[]>;
  findExpiredByCustomer(customerId: string): Promise<Appointment[]>;
  findFinishedByCustomer(customerId: string): Promise<Appointment[]>;
  findCancelledByBarber(barberId: string): Promise<Appointment[]>;
  findConfirmedByBarber(barberId: string): Promise<Appointment[]>;
  findExpiredByBarber(barberId: string): Promise<Appointment[]>;
  findFinishedByBarber(barberId: string): Promise<Appointment[]>;
  findManyByCustomer(customerId: string): Promise<Appointment[]>;
  findManyByBarber(barberId: string): Promise<Appointment[]>;
  findManyByService(serviceId: string): Promise<Appointment[]>;
  findAll(): Promise<Appointment[]>;
  clear(): Promise<void>;
}
