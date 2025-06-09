import { CreateBarber } from "@/application/use-cases/create-barber";
import { BarberController } from "@/infra/http/controllers/barber.controller";
import { InMemoryBarberRepository } from "@/infra/repositories/in-memory/in-memory-barber.repository";

const barberRepo = new InMemoryBarberRepository();
const createBarber = new CreateBarber(barberRepo);
const barberController = new BarberController(createBarber);

export { barberController, createBarber };
