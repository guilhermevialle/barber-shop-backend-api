import { InvalidTimeError } from "@/domain/errors/shared-errors";
import { idGeneratorService } from "@/domain/services/id-generator.service";
import { Time } from "@/domain/value-objects/time.vo";
import { describe, expect, it } from "vitest";
import { WorkShift } from "./work-shift.entity";

describe("WorkShift", () => {
  const workdayId = idGeneratorService.generateDefault();

  const validProps = {
    workdayId,
    startTime: new Time(9 * 60),
    endTime: new Time(12 * 60),
  };

  it("should create a valid WorkShift", () => {
    const shift = WorkShift.create(validProps);
    expect(shift).toBeInstanceOf(WorkShift);
    expect(shift.startTime.minutes).toBe(540);
    expect(shift.endTime.minutes).toBe(720);
    expect(shift.workdayId).toBe(validProps.workdayId);
  });

  it("should throw if startTime is not a multiple of 30 minutes", () => {
    const props = {
      ...validProps,
      startTime: new Time(545),
    };
    expect(() => WorkShift.create(props)).toThrow(InvalidTimeError);
  });

  it("should throw if endTime is not a multiple of 30 minutes", () => {
    const props = {
      ...validProps,
      endTime: new Time(725),
    };
    expect(() => WorkShift.create(props)).toThrow(InvalidTimeError);
  });

  it("should throw if endTime is before startTime", () => {
    const props = {
      ...validProps,
      endTime: new Time(8 * 60),
    };
    expect(() => WorkShift.create(props)).toThrow(InvalidTimeError);
  });

  it("should throw if endTime is equal to startTime", () => {
    const props = {
      ...validProps,
      endTime: new Time(9 * 60),
    };
    expect(() => WorkShift.create(props)).toThrow(InvalidTimeError);
  });

  it("should throw if duration is less than 30 minutes", () => {
    const props = {
      ...validProps,
      endTime: new Time(9 * 60 + 15),
    };
    expect(() => WorkShift.create(props)).toThrow(InvalidTimeError);
  });

  it("should restore a WorkShift with predefined id", () => {
    const id = idGeneratorService.generateDefault();
    const restored = WorkShift.restore({
      ...validProps,
      id,
    });

    expect(restored).toBeInstanceOf(WorkShift);
    expect(restored.id).toBe(id);
  });
});
