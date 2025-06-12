import { addDays, subMinutes } from "date-fns";
import { describe, expect, it } from "vitest";
import { DateFactory } from "../helpers/date-factory";
import { idGeneratorService } from "../services/id-generator.service";
import {
  AppointmentProps,
  AppointmentStatus,
} from "../types/entity-types/appointment.types";
import { Appointment } from "./appointment.entity";

const tomorrow = addDays(new Date(), 1).getDate();

const baseProps: AppointmentProps = {
  customerId: idGeneratorService.generateDefault(),
  barberId: idGeneratorService.generateDefault(),
  serviceId: idGeneratorService.generateDefault(),
  startAt: DateFactory.hour(10).minute(0).day(tomorrow).build(),
  priceInCents: 2000,
  durationInMinutes: 30,
};

describe("Appointment Entity", () => {
  it("should create an appointment with valid props", () => {
    const appointment = Appointment.create(baseProps);
    expect(appointment).toBeInstanceOf(Appointment);
    expect(appointment.id).toBeDefined();
    expect(appointment.customerId).toBe(baseProps.customerId);
    expect(appointment.barberId).toBe(baseProps.barberId);
    expect(appointment.serviceId).toBe(baseProps.serviceId);
    expect(appointment.startAt).toStrictEqual(baseProps.startAt);
    expect(appointment.priceInCents).toBe(baseProps.priceInCents);
    expect(appointment.durationInMinutes).toBe(baseProps.durationInMinutes);
  });

  it("should calculate endAt correctly", () => {
    const appointment = Appointment.create(baseProps);
    const expectedEnd = addDays(baseProps.startAt, 0);
    expectedEnd.setMinutes(
      expectedEnd.getMinutes() + baseProps.durationInMinutes
    );
    expect(appointment.endAt.getTime()).toBe(
      appointment.startAt.getTime() + baseProps.durationInMinutes * 60000
    );
  });

  it("should throw if startAt is in the past", () => {
    const pastStart = subMinutes(new Date(), 1);

    expect(() =>
      Appointment.create({ ...baseProps, startAt: pastStart })
    ).toThrow();
  });

  it("should throw if startAt is more than 30 days in the future", () => {
    const tooFar = addDays(new Date(), 31);
    expect(() =>
      Appointment.create({ ...baseProps, startAt: tooFar })
    ).toThrow();
  });

  it("should restore an appointment with an existing id", () => {
    const propsWithId = {
      ...baseProps,
      status: AppointmentStatus.CONFIRMED,
      id: "apt_12345678901234567",
    };

    const restored = Appointment.restore(propsWithId);
    expect(restored.id).toBe("apt_12345678901234567");
  });

  it("should generate an id if not provided", () => {
    const appointment = Appointment.create(baseProps);
    expect(appointment.id).toBeDefined();
    expect(appointment.id).toMatch(/^.{21}$/); // nanoid length
  });

  it("should return props via toJSON", () => {
    const appointment = Appointment.create(baseProps);
    expect(appointment.toJSON()).toMatchObject({
      customerId: baseProps.customerId,
      barberId: baseProps.barberId,
      serviceId: baseProps.serviceId,
      startAt: baseProps.startAt,
      durationInMinutes: baseProps.durationInMinutes,
      priceInCents: baseProps.priceInCents,
    });
  });
});
