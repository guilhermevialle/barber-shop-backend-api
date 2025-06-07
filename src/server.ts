import { Barber } from "./domain/aggregates/barber.aggregate";
import { WorkdayFactory } from "./domain/helpers/workday-factory";
import { BarberAvailabilityService } from "./domain/services/barber-availability.service";
import { idGeneratorService } from "./domain/services/id-generator.service";
import { Username } from "./domain/value-objects/username.vo";
import { InMemoryAppointmentRepository } from "./infra/repositories/in-memory/in-memory-appointment.repository";
import { InMemoryBarberRepository } from "./infra/repositories/in-memory/in-memory-barber.repository";

async function main() {
  const barber = Barber.create({
    name: "John Doe",
    username: Username.create("johndoe"),
    workdays: [],
  });

  const barberRepo = new InMemoryBarberRepository();
  const appointmentRepo = new InMemoryAppointmentRepository();
  const workdayFactory = new WorkdayFactory(idGeneratorService);

  const availabilityService = new BarberAvailabilityService(
    barberRepo,
    appointmentRepo
  );

  const workdays = workdayFactory.createMany({
    barberId: barber.id,
    between: [0, 6],
    shifts: [
      {
        startTime: "08:00",
        endTime: "10:00",
      },
      {
        startTime: "13:00",
        endTime: "14:00",
      },
    ],
  });

  barber.addWorkdays(workdays);
  await barberRepo.save(barber);

  const today = new Date();
  const slots = await availabilityService.getAvailableTimeSlotsByDate(
    barber.id,
    today
  );

  console.log(`Available slots for ${today.toDateString()}:`);
  console.log(slots);
}

main().catch(console.error);
