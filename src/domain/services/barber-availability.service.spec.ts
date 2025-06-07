import { InMemoryAppointmentRepository } from "@/infra/repositories/in-memory/in-memory-appointment.repository";
import { InMemoryBarberRepository } from "@/infra/repositories/in-memory/in-memory-barber.repository";
import { IAppointmentRepository } from "@/interfaces/repositories/appointment-repository.interface";
import { IBarberRepository } from "@/interfaces/repositories/barber-repository.interface";
import { IBarberAvailabilityService } from "@/interfaces/services/barber-availability-service.interface";
import { addDays } from "date-fns";
import { beforeEach, describe, expect, it } from "vitest";
import { Barber } from "../aggregates/barber.aggregate";
import { Appointment } from "../entities/appointment.entity";
import { DateFactory } from "../helpers/date-factory";
import { WorkdayFactory } from "../helpers/workday-factory";
import { Username } from "../value-objects/username.vo";
import { BarberAvailabilityService } from "./barber-availability.service";
import { idGeneratorService } from "./id-generator.service";

describe("BarberAvailability Service", () => {
  let barber: Barber;
  let barberRepo: IBarberRepository;
  let appointmentRepo: IAppointmentRepository;
  let workdayFactory: WorkdayFactory;
  let availabilityService: IBarberAvailabilityService;

  beforeEach(() => {
    barber = Barber.create({
      name: "John Doe",
      username: Username.create("johndoe"),
      workdays: [],
    });

    barberRepo = new InMemoryBarberRepository();
    appointmentRepo = new InMemoryAppointmentRepository();
    workdayFactory = new WorkdayFactory(idGeneratorService);

    availabilityService = new BarberAvailabilityService(
      barberRepo,
      appointmentRepo
    );
  });

  it("should return all free slots in a weekday properly", async () => {
    const days = workdayFactory.createMany({
      barberId: barber.id,
      between: [0, 6],
      shifts: [
        {
          startTime: "08:00",
          endTime: "10:00",
        },
      ],
    });

    barber.addWorkdays(days);
    await barberRepo.save(barber);

    const slots = await availabilityService.getAvailableTimeSlotsByDate(
      barber.id,
      new Date()
    );

    console.log({ slots });
    expect(slots).toHaveLength(4); // 08:00, 08:30, 09:00, 09:30
  });

  it("should skip time slots that overlap with existing appointments", async () => {
    const days = workdayFactory.createMany({
      barberId: barber.id,
      between: [0, 6],
      shifts: [
        {
          startTime: "08:00",
          endTime: "10:00",
        },
      ],
    });

    barber.addWorkdays(days);
    await barberRepo.save(barber);

    await appointmentRepo.save(
      Appointment.create({
        barberId: barber.id,
        serviceId: idGeneratorService.generateDefault(),
        startAt: DateFactory.hour(9)
          .minute(30)
          .day(addDays(new Date(), 1).getDate())
          .build(),
        durationInMinutes: 30,
        customerId: idGeneratorService.generateDefault(),
        priceInCents: 2000,
      })
    );

    await appointmentRepo.save(
      Appointment.create({
        barberId: barber.id,
        serviceId: idGeneratorService.generateDefault(),
        startAt: DateFactory.hour(8)
          .minute(30)
          .day(addDays(new Date(), 1).getDate())
          .build(),
        durationInMinutes: 45,
        customerId: idGeneratorService.generateDefault(),
        priceInCents: 2000,
      })
    );

    const slots = await availabilityService.getAvailableTimeSlotsByDate(
      barber.id,
      addDays(new Date(), 1)
    );

    console.log({ slots });
    expect(slots).toHaveLength(2);
    // 08:00, 08:30, 09:00
  });
});
