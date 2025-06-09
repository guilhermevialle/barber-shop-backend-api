import { describe, expect, it } from "vitest";
import { Time } from "./time.vo";

describe("Time value object", () => {
  // Factory and getters
  it("creates Time from string, Date and number, and exposes getters correctly", () => {
    const t1 = Time.create("08:30");
    expect(t1.hour).toBe(8);
    expect(t1.minute).toBe(30);
    expect(t1.minutes).toBe(510);
    expect(t1.formatted).toBe("08:30");
    expect(t1.toString()).toBe("08:30");

    const date = new Date("2025-06-05T14:45:00");
    const t2 = Time.create(date);
    expect(t2.hour).toBe(14);
    expect(t2.minute).toBe(45);

    const t3 = Time.create(870);
    expect(t3.hour).toBe(14);
    expect(t3.minute).toBe(30);
  });

  // Comparison methods
  it("correctly compares times with isAfter, isBefore, isEqual, isBetween", () => {
    const t8 = Time.create("08:00");
    const t9 = Time.create("09:00");
    const t830 = Time.create("08:30");

    expect(t9.isAfter(t8)).toBe(true);
    expect(t8.isAfter(t8)).toBe(true); // inclusive default true
    expect(t8.isAfter(t8, false)).toBe(false);

    expect(t8.isBefore(t9)).toBe(true);
    expect(t8.isBefore(t8)).toBe(true);
    expect(t8.isBefore(t8, false)).toBe(false);

    expect(t8.isEqual(Time.create("08:00"))).toBe(true);
    expect(t8.isEqual(t9)).toBe(false);

    expect(t830.isBetween(t8, t9)).toBe(true);
    expect(t8.isBetween(t8, t9)).toBe(true);
    expect(t8.isBetween(t8, t9, false)).toBe(false);
  });

  // Arithmetic methods
  it("adds and subtracts minutes and hours correctly", () => {
    const t = Time.create("10:00");

    expect(t.addMinutes(30).formatted).toBe("10:30");
    expect(t.subMinutes(15).formatted).toBe("09:45");

    expect(t.addHours(2).formatted).toBe("12:00");
    expect(t.subHours(1).formatted).toBe("09:00");
  });

  // isDivisibleBy method
  it("checks divisibility of time in minutes", () => {
    expect(Time.create("08:30").isDivisibleBy(30)).toBe(true);
    expect(Time.create("08:35").isDivisibleBy(30)).toBe(false);
  });

  // toDate method
  it("converts Time to Date using reference date", () => {
    const baseDate = new Date("2025-06-01T00:00:00");
    const t = Time.create("13:45");
    const dateWithTime = t.toDate(baseDate);
    expect(dateWithTime.getFullYear()).toBe(2025);
    expect(dateWithTime.getMonth()).toBe(5); // June (0-based)
    expect(dateWithTime.getDate()).toBe(1);
    expect(dateWithTime.getHours()).toBe(13);
    expect(dateWithTime.getMinutes()).toBe(45);
    expect(dateWithTime.getSeconds()).toBe(0);
    expect(dateWithTime.getMilliseconds()).toBe(0);
  });

  // isLessOrEqual and isGreaterOrEqual
  it("correctly evaluates isLessOrEqual and isGreaterOrEqual", () => {
    const t1 = Time.create("10:00");
    const t2 = Time.create("10:00");
    const t3 = Time.create("11:00");

    expect(t1.isLessOrEqual(t2)).toBe(true);
    expect(t1.isLessOrEqual(t3)).toBe(true);
    expect(t3.isLessOrEqual(t1)).toBe(false);

    expect(t3.isGreaterOrEqual(t1)).toBe(true);
    expect(t1.isGreaterOrEqual(t2)).toBe(true);
    expect(t1.isGreaterOrEqual(t3)).toBe(false);
  });
});
