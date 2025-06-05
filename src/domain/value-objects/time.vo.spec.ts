import { describe, expect, it } from "vitest";
import { Time } from "./time.vo";

describe("Time Value Object", () => {
  it("should create from Date and parse minutes correctly", () => {
    const date = new Date("2025-06-05T08:30:00");
    const time = Time.create(date);
    expect(time.minutes).toBe(8 * 60 + 30);
  });

  it("should create from 'HH:mm' string and parse minutes correctly", () => {
    const time = Time.create("08:30");
    expect(time.minutes).toBe(8 * 60 + 30);
  });

  it("should create from number (minutes) correctly", () => {
    const time = Time.create(510);
    expect(time.minutes).toBe(510);
  });

  // Métodos isAfter, isBefore, isEqual
  it("should correctly compare isAfter, isBefore and isEqual", () => {
    const time1 = Time.create("08:00");
    const time2 = Time.create("09:00");
    const time3 = Time.create("08:00");

    expect(time2.isAfter(time1)).toBe(true);
    expect(time1.isAfter(time2)).toBe(false);

    expect(time1.isBefore(time2)).toBe(true);
    expect(time2.isBefore(time1)).toBe(false);

    expect(time1.isEqual(time3)).toBe(true);
    expect(time1.isEqual(time2)).toBe(false);
  });

  // isBetween
  it("should correctly evaluate isBetween", () => {
    const time = Time.create("08:30");
    const start = Time.create("08:00");
    const end = Time.create("09:00");

    expect(time.isBetween(start, end)).toBe(true);
    expect(start.isBetween(time, end)).toBe(false);
  });

  // toString / formatted
  it("should return formatted string with toString() and formatted getter", () => {
    const time = Time.create("08:05");
    expect(time.toString()).toBe("08:05");
    expect(time.formatted).toBe("08:05");
  });

  // toDate
  it("should convert to Date correctly with referenceDate", () => {
    const refDate = new Date("2025-06-05T00:00:00");
    const time = Time.create("08:30");
    const result = time.toDate(new Date(refDate)); // Pass copy to avoid mutation

    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(5); // Junho é mês 5 (0-indexed)
    expect(result.getDate()).toBe(5);
    expect(result.getHours()).toBe(8);
    expect(result.getMinutes()).toBe(30);
    expect(result.getSeconds()).toBe(0);
  });

  // addMinutes e subMinutes
  it("should add and subtract minutes correctly", () => {
    const time = Time.create("08:00");

    expect(time.addMinutes(30).minutes).toBe(8 * 60 + 30);
    expect(time.subMinutes(30).minutes).toBe(8 * 60 - 30);
  });

  // addHours e subHours
  it("should add and subtract hours correctly", () => {
    const time = Time.create("08:00");

    expect(time.addHours(2).minutes).toBe(10 * 60);
    expect(time.subHours(2).minutes).toBe(6 * 60);
  });

  // getters
  it("should return correct hour, minute, milliseconds getters", () => {
    const time = Time.create("08:30");

    expect(time.hour).toBe(8);
    expect(time.minute).toBe(30);
    expect(time.milliseconds).toBe((8 * 60 + 30) * 60 * 1000);
  });
});
