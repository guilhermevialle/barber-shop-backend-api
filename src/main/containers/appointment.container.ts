import { BarberAvailabilityService } from "@/application/services/barber-availability.service";
import { CreateAppointment } from "@/application/use-cases/create-appointment";
import { AppointmentController } from "@/infra/http/controllers/appointment.controller";
import { InMemoryAppointmentRepository } from "@/infra/repositories/in-memory/in-memory-appointment.repository";
import { InMemoryBarberRepository } from "@/infra/repositories/in-memory/in-memory-barber.repository";
import { InMemoryCustomerRepository } from "@/infra/repositories/in-memory/in-memory-customer.repository";
import { InMemoryServiceRepository } from "@/infra/repositories/in-memory/in-memory-service.repository";

const barberRepo = new InMemoryBarberRepository();
const customerRepo = new InMemoryCustomerRepository();
const appointmentRepo = new InMemoryAppointmentRepository();
const serviceRepo = new InMemoryServiceRepository();
const barberAvailabilityService = new BarberAvailabilityService(
  barberRepo,
  appointmentRepo
);
const createAppointment = new CreateAppointment(
  barberRepo,
  customerRepo,
  serviceRepo,
  appointmentRepo,
  barberAvailabilityService
);
const appointmentController = new AppointmentController(createAppointment);

export { appointmentController, createAppointment };
