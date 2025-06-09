import { BarberAvailabilityService } from "@/application/services/barber-availability.service";
import { CreateBarber } from "@/application/use-cases/create-barber";
import { FindBarberAvailability } from "@/application/use-cases/find-barber-availability";
import { ListBarbers } from "@/application/use-cases/list-barbers";
import { BarberController } from "@/infra/http/controllers/barber.controller";
import { InMemoryAppointmentRepository } from "@/infra/repositories/in-memory/in-memory-appointment.repository";
import { InMemoryBarberRepository } from "@/infra/repositories/in-memory/in-memory-barber.repository";

const barberRepo = new InMemoryBarberRepository();
const appointmentRepo = new InMemoryAppointmentRepository();
const createBarber = new CreateBarber(barberRepo);
const listBarbers = new ListBarbers(barberRepo);
const barberAvailabilityService = new BarberAvailabilityService(
  barberRepo,
  appointmentRepo
);
const findBarberAvailability = new FindBarberAvailability(
  barberRepo,
  barberAvailabilityService
);
const barberController = new BarberController(
  createBarber,
  listBarbers,
  findBarberAvailability
);

export { barberController, createBarber };
