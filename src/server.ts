import { Barber } from "./domain/aggregates/barber.aggregate";
import { Workday } from "./domain/entities/workday.entity";

const barber = Barber.create({
  name: "John Doe",
  workdays: [],
});

const workday = Workday.create({
  barberId: barber.id,
  weekday: 0,
  workShifts: [],
});

console.log(barber);
