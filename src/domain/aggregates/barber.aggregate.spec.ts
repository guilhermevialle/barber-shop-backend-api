import { beforeAll, describe, expect, it } from "vitest";
import { WorkShift } from "../entities/work-shift.entity";
import { Workday } from "../entities/workday.entity";
import { idGeneratorService } from "../services/id-generator.service";
import { Time } from "../value-objects/time.vo";
import { Username } from "../value-objects/username.vo";
import { Barber } from "./barber.aggregate";

describe("Barber Aggregate", () => {
  const barberId = idGeneratorService.generateDefault();
  const workdayId = idGeneratorService.generateDefault();
  const username = Username.create("johndoe");

  const workdays = Array.from({ length: 7 }).map((_, index) =>
    Workday.restore({
      id: workdayId,
      barberId,
      weekday: index,
      shifts: [
        WorkShift.create({
          workdayId,
          startTime: new Time("08:00"),
          endTime: new Time("18:00"),
        }),
      ],
    })
  );

  let barber: Barber;

  beforeAll(() => {
    barber = Barber.restore({
      id: barberId,
      name: "John Doe",
      username,
      workdays,
    });
  });

  it("should create a barber with valid props", () => {
    expect(barber).toBeInstanceOf(Barber);
    expect(barber.id).toBe(barberId);
    expect(barber.name).toBe("John Doe");
    expect(barber.username).toBe(username);
    expect(barber.workdays.length).toBe(7);
  });

  it("should generate an id if not provided", () => {
    const barberWithoutId = Barber.create({
      name: "Jane Doe",
      username,
      workdays,
    });
    expect(barberWithoutId.id).toBeDefined();
    expect(barberWithoutId.id.length).toBe(21);
  });

  it("should restore a barber using full props", () => {
    const restored = Barber.restore({
      id: barberId,
      name: "John Doe",
      username,
      workdays,
    });
    expect(restored).toBeInstanceOf(Barber);
  });

  it("should return all props via toJSON", () => {
    const json = barber.toJSON();
    expect(json).toEqual({
      id: barberId,
      name: "John Doe",
      username: username.value,
      workdays: workdays.map((workday) => workday.toJSON()),
    });
  });

  it("should return correct getters", () => {
    expect(barber.id).toBe(barberId);
    expect(barber.name).toBe("John Doe");
    expect(barber.username).toBe(username);
    expect(barber.workdays).toHaveLength(7);
  });

  it("should return true for isWorking if workdays exist", () => {
    expect(barber.isNotWorking()).toBe(false);
  });

  it("should return false for isWorking if workdays is empty", () => {
    const idleBarber = Barber.create({ name: "Lazy", username, workdays: [] });
    expect(idleBarber.isNotWorking()).toBe(true);
  });

  it("should add a new workday", () => {
    const newWorkday = Workday.restore({
      id: idGeneratorService.generateDefault(),
      barberId,
      weekday: 1,
      shifts: [
        WorkShift.create({
          workdayId,
          startTime: new Time("08:00"),
          endTime: new Time("18:00"),
        }),
      ],
    });

    const b = Barber.create({ name: "Addy", username, workdays: [] });
    expect(b.workdays).toHaveLength(0);

    b.addWorkday(newWorkday);
    expect(b.workdays).toHaveLength(1);
    expect(b.workdays[0]).toBe(newWorkday);
  });
});
