import { addMinutes } from "date-fns";
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

(async () => {
  try {
    const barberRepo = new InMemoryBarberRepository();
    const appointmentRepo = new InMemoryAppointmentRepository();
    const barberAvailabilityService = new BarberAvailabilityService(
      barberRepo,
      appointmentRepo
    );

    const barber = Barber.create({
      name: "John Doe",
      username: Username.create("johndoe"),
      workdays: [],
    });

    const workdayId = idGeneratorService.generateDefault();

    barber.addWorkday(
      Workday.restore({
        id: idGeneratorService.generateDefault(),
        barberId: barber.id,
        weekday: 1,
        workShifts: [
          WorkShift.create({
            workdayId: workdayId,
            startTime: Time.create("08:00"),
            endTime: Time.create("12:00"),
          }),
          WorkShift.create({
            workdayId: workdayId,
            startTime: Time.create("13:00"),
            endTime: Time.create("17:30"),
          }),
        ],
      })
    );

    await barberRepo.save(barber);

    const _7 = DateFactory.hour(7).minute(0).build();
    const _7_45 = DateFactory.hour(7).minute(45).build();
    const _8_15 = DateFactory.hour(8).minute(15).build();

    await appointmentRepo.save(
      Appointment.create({
        barberId: barber.id,
        customerId: idGeneratorService.generateDefault(),
        serviceId: idGeneratorService.generateDefault(),
        startAt: _7_45,
        durationInMinutes: 30,
        priceInCents: 2000,
      })
    );

    await appointmentRepo.save(
      Appointment.create({
        barberId: barber.id,
        customerId: idGeneratorService.generateDefault(),
        serviceId: idGeneratorService.generateDefault(),
        startAt: _8_15,
        durationInMinutes: 60,
        priceInCents: 2000,
      })
    );

    const now = new Date();

    const isAvailable = await barberAvailabilityService.isAvailableInRange(
      barber.id,
      addMinutes(_7, 45),
      addMinutes(addMinutes(_7, 45), 30)
    );

    console.log({ isAvailable });
  } catch (error: any) {
    console.log({
      error: "error",
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
  }
})();
