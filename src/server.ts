import { Barber } from "./domain/aggregates/barber.aggregate";
import { WorkShift } from "./domain/entities/work-shift.entity";
import { Workday } from "./domain/entities/workday.entity";
import { idGeneratorService } from "./domain/services/id-generator.service";
import { Time } from "./domain/value-objects/time.vo";

const barber = Barber.create({
  name: "John Doe",
  workdays: [],
});

const workdayId = idGeneratorService.generateDefault();

const workday = Workday.restore({
  id: workdayId,
  barberId: barber.id,
  weekday: 0,
  workShifts: [
    WorkShift.create({
      workdayId,
      startTime: Time.create("11:30"),
      endTime: Time.create("12:00"),
    }),

    WorkShift.create({
      workdayId,
      startTime: Time.create("13:00"),
      endTime: Time.create("17:30"),
    }),
  ],
});

barber.addWorkday(workday);

console.log(JSON.stringify(workday, null, 2));
