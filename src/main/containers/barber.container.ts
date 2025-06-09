import { CreateBarber } from "@/application/use-cases/create-barber";
import { ListBarbers } from "@/application/use-cases/list-barbers";
import { BarberController } from "@/infra/http/controllers/barber.controller";
import { InMemoryBarberRepository } from "@/infra/repositories/in-memory/in-memory-barber.repository";

const barberRepo = new InMemoryBarberRepository();
const createBarber = new CreateBarber(barberRepo);
const listBarbers = new ListBarbers(barberRepo);
const barberController = new BarberController(createBarber, listBarbers);

export { barberController, createBarber };
