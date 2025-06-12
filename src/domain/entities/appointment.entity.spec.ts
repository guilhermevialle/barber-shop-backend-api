import { describe, expect, it } from "vitest";
import { DateFactory } from "../helpers/date-factory";
import { idGeneratorService } from "../services/id-generator.service";
import { AppointmentStatus } from "../types/entity-types/appointment.types";
import { Appointment } from "./appointment.entity";

const props = {
  id: idGeneratorService.generateDefault(),
  barberId: idGeneratorService.generateDefault(),
  customerId: idGeneratorService.generateDefault(),
  serviceId: idGeneratorService.generateDefault(),
  status: AppointmentStatus.CONFIRMED,
  startAt: DateFactory.hour(8)
    .minute(30)
    .day(new Date().getDate() + 1)
    .build(new Date()),
  durationInMinutes: 30,
  priceInCents: 3000,
};

describe("Appointment Entity", () => {
  it("should have default values (id, status, endAt)", () => {
    const appointment = Appointment.create({ ...props });
    expect(appointment.id).toBeDefined();
    expect(appointment.status).toBe(AppointmentStatus.CONFIRMED);
    expect(appointment.endAt).toBeInstanceOf(Date);
  });

  it("should restore entirely", () => {
    const appointment = Appointment.restore({
      ...props,
    });

    expect(appointment.toJSON()).toStrictEqual(props);
  });

  it('should cancel only "CONFIRMED" appointment', () => {
    [
      AppointmentStatus.EXPIRED,
      AppointmentStatus.CANCELLED,
      AppointmentStatus.FINISHED,
    ].map((status) => {
      expect(() => {
        Appointment.restore({
          ...props,
          status,
        }).cancel();
      }).toThrow();
    });

    expect(() => {
      Appointment.restore({
        ...props,
        status: AppointmentStatus.CONFIRMED,
      }).cancel();
    }).not.toThrow();
  });

  it("should update the status when cancelled", () => {
    const appointment = Appointment.restore({
      ...props,
      status: AppointmentStatus.CONFIRMED,
    });
    appointment.cancel();
    expect(appointment.status).toBe(AppointmentStatus.CANCELLED);
  });
});
