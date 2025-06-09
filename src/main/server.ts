// app.listen({ port: 3030 }, () => console.log("Server running on port 3030"));

import { Appointment } from "@/domain/entities/appointment.entity";
import { DateFactory } from "@/domain/helpers/date-factory";
import { idGeneratorService } from "@/domain/services/id-generator.service";
import { toCents } from "@/utils/to-cents";

(async () => {
  try {
    const now = new Date();
    const future = DateFactory.day(now.getDate() + 1).build();

    const appointment = Appointment.create({
      customerId: idGeneratorService.generateDefault(),
      barberId: idGeneratorService.generateDefault(),
      serviceId: idGeneratorService.generateDefault(),
      startAt: DateFactory.hour(11).minute(30).build(future),
      durationInMinutes: 45,
      priceInCents: toCents(30),
    });

    const appointment2 = Appointment.create({
      customerId: idGeneratorService.generateDefault(),
      barberId: idGeneratorService.generateDefault(),
      serviceId: idGeneratorService.generateDefault(),
      startAt: DateFactory.hour(10).minute(45).build(future),
      durationInMinutes: 30,
      priceInCents: toCents(30),
    });

    console.log(appointment.startAt.toLocaleString());
    console.log(appointment.conflictsWith(appointment2));
  } catch (error: any) {
    console.log({
      error: error.name,
      message: error.message,
    });
  }
})();
