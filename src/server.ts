import { Barber } from "./domain/aggregates/barber.aggregate";
import { Service } from "./domain/entities/service.entity";
import { toCents } from "./utils/to-cents";

const barber = Barber.create({
  name: "John Doe",
  workdays: [],
  offeredServices: [
    Service.create({
      type: "Default Haircut",
      priceInCents: toCents(30),
      durationInMinutes: 30,
    }),
  ],
});
