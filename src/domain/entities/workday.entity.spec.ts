import { WorkShift } from "@/domain/entities/work-shift.entity";
import { Workday } from "@/domain/entities/workday.entity";
import { idGeneratorService } from "@/domain/services/id-generator.service";
import { Time } from "@/domain/value-objects/time.vo";
import { describe, expect, it } from "vitest";

describe("Workday Entity", () => {
  const barberId = idGeneratorService.generateDefault();
  const shift = WorkShift.create({
    workdayId: idGeneratorService.generateDefault(),
    startTime: new Time(9 * 60),
    endTime: new Time(12 * 60),
  });

  const validProps = {
    barberId,
    weekday: 2,
    shifts: [shift],
  };

  it("should create a valid Workday", () => {
    const workday = Workday.create(validProps);
    expect(workday).toBeInstanceOf(Workday);
    expect(workday.barberId).toBe(validProps.barberId);
    expect(workday.weekday).toBe(validProps.weekday);
    expect(workday.shifts.length).toBe(1);
  });

  it("should throw if shifts is empty", () => {
    const props = { ...validProps, shifts: [] };
    expect(() => Workday.create(props as any)).toThrow();
  });

  it("should throw if weekday is out of range", () => {
    const props = { ...validProps, weekday: 7 }; // Invalid weekday
    expect(() => Workday.create(props as any)).toThrow();
  });

  it("should restore a Workday with predefined id", () => {
    const id = idGeneratorService.generateDefault();
    const restored = Workday.restore({
      ...validProps,
      id,
    });

    expect(restored).toBeInstanceOf(Workday);
    expect(restored.id).toBe(id);
  });
});
