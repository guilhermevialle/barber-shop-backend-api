import { Barber } from "./domain/aggregates/barber.aggregate";
import { Appointment } from "./domain/entities/appointment.entity";
import { WorkShift } from "./domain/entities/work-shift.entity";
import { Workday } from "./domain/entities/workday.entity";
import { DateFactory } from "./domain/helpers/date-factory";
import { BarberAvailabilityService } from "./domain/services/barber-availability.service";
import { idGeneratorService } from "./domain/services/id-generator.service";
import { Time } from "./domain/value-objects/time.vo";
import { Username } from "./domain/value-objects/username.vo";
import { InMemoryAppointmentRepository } from "./infra/repositories/in-memory/in-memory-appointment.repository";
import { InMemoryBarberRepository } from "./infra/repositories/in-memory/in-memory-barber.repository";

const barberRepo = new InMemoryBarberRepository();
const appointmentRepo = new InMemoryAppointmentRepository();
const barberAvailabilityService = new BarberAvailabilityService(
  barberRepo,
  appointmentRepo
);

(async () => {
  const barberId = idGeneratorService.generateDefault();
  const workdayId = idGeneratorService.generateDefault();

  appointmentRepo.save(
    Appointment.create({
      barberId,
      customerId: idGeneratorService.generateDefault(),
      startAt: DateFactory.hour(8).minute(0).build(),
      serviceId: idGeneratorService.generateDefault(),
      priceInCents: 2000,
      durationInMinutes: 60,
    })
  );

  appointmentRepo.save(
    Appointment.create({
      barberId,
      customerId: idGeneratorService.generateDefault(),
      startAt: DateFactory.hour(9).minute(0).build(),
      serviceId: idGeneratorService.generateDefault(),
      priceInCents: 2000,
      durationInMinutes: 45,
    })
  );

  appointmentRepo.save(
    Appointment.create({
      barberId,
      customerId: idGeneratorService.generateDefault(),
      startAt: DateFactory.hour(10).minute(15).build(),
      serviceId: idGeneratorService.generateDefault(),
      priceInCents: 2000,
      durationInMinutes: 45,
    })
  );

  appointmentRepo.save(
    Appointment.create({
      barberId,
      customerId: idGeneratorService.generateDefault(),
      startAt: DateFactory.hour(13).minute(0).build(),
      serviceId: idGeneratorService.generateDefault(),
      priceInCents: 2000,
      durationInMinutes: 90,
    })
  );

  appointmentRepo.save(
    Appointment.create({
      barberId,
      customerId: idGeneratorService.generateDefault(),
      startAt: DateFactory.hour(9).minute(45).build(),
      serviceId: idGeneratorService.generateDefault(),
      priceInCents: 2000,
      durationInMinutes: 30,
    })
  );

  appointmentRepo.save(
    Appointment.create({
      barberId,
      customerId: idGeneratorService.generateDefault(),
      startAt: DateFactory.hour(16).minute(0).build(),
      serviceId: idGeneratorService.generateDefault(),
      priceInCents: 2000,
      durationInMinutes: 45,
    })
  );

  id: idGeneratorService.generateDefault(),
    await barberRepo.save(
      Barber.restore({
        id: barberId,
        name: "Fulano",
        username: Username.create("fulano"),
        workdays: [
          Workday.restore({
            id: workdayId,
            weekday: 1,
            barberId,
            workShifts: [
              WorkShift.restore({
                id: idGeneratorService.generateDefault(),
                workdayId,
                startTime: Time.create("08:00"),
                endTime: Time.create("12:00"),
              }),
              WorkShift.restore({
                id: idGeneratorService.generateDefault(),
                workdayId,
                startTime: Time.create("13:00"),
                endTime: Time.create("17:30"),
              }),
            ],
          }),
        ],
      })
    );

  const slots = await barberAvailabilityService.getSlotsByBarberAndWeekday(
    barberId,
    1
  );
  console.log(slots);
})();
