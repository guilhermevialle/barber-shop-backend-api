import { TimeInput } from "../types/time.types";
import { parseTimeInput } from "../utils/parse-time-input";

/**
 * Represents a specific time of day using minutes since midnight.
 *
 * Useful for operations such as comparisons, formatting, and arithmetic with time values.
 *
 * @example
 * const time = Time.create("08:30");
 * time.hour; // 8
 * time.minute; // 30
 * time.formatted; // "08:30"
 */
export class Time {
  private _minutes: number;

  /**
   * Creates a new `Time` instance.
   *
   * Prefer using `Time.create()` for clarity and type safety.
   *
   * @param input - The time to be parsed: `Date`, `"HH:mm"` string, or number (0–1439).
   */
  constructor(input: TimeInput) {
    this._minutes = parseTimeInput(input);
  }

  /**
   * Factory method for creating `Time` instances from supported input types.
   *
   * @param input - One of the supported formats:
   * - A `Date` object → e.g. `new Date('2025-06-05T08:30:00')`
   * - A `"HH:mm"` formatted string → e.g. `"08:30"`
   * - A number between 0 and 1439 (minutes since midnight) → e.g. `510`
   *
   * @returns A new `Time` instance.
   *
   * @example
   * Time.create("14:45");
   * Time.create(new Date());
   * Time.create(870); // 14:30
   */
  static create(input: TimeInput): Time {
    return new Time(input);
  }

  /**
   * Checks if this time is after the given time.
   *
   * @param other - The time to compare with.
   * @param inclusive - If true, equality is considered "after".
   * @returns Whether this time is after (or equal to) the other.
   */
  public isAfter(other: Time, inclusive: boolean = true): boolean {
    return inclusive
      ? this._minutes >= other._minutes
      : this._minutes > other._minutes;
  }

  /**
   * Checks if this time is before the given time.
   *
   * @param other - The time to compare with.
   * @param inclusive - If true, equality is considered "before".
   * @returns Whether this time is before (or equal to) the other.
   */
  public isBefore(other: Time, inclusive: boolean = true): boolean {
    return inclusive
      ? this._minutes <= other._minutes
      : this._minutes < other._minutes;
  }

  /**
   * Checks if this time is equal to the given time.
   *
   * @param other - The time to compare with.
   * @returns Whether both times represent the same moment.
   */
  public isEqual(other: Time): boolean {
    return this._minutes === other._minutes;
  }

  /**
   * Checks if this time is between two other times.
   *
   * @param start - Start time.
   * @param end - End time.
   * @param inclusive - If true, includes the boundaries.
   * @returns Whether this time is in the interval.
   */
  public isBetween(start: Time, end: Time, inclusive: boolean = true): boolean {
    return inclusive
      ? this._minutes >= start._minutes && this._minutes <= end._minutes
      : this._minutes > start._minutes && this._minutes < end._minutes;
  }

  /**
   * Returns this time as a `"HH:mm"` formatted string.
   *
   * @example
   * new Time("08:05").toString(); // "08:05"
   */
  public toString(): string {
    return this.formatted;
  }

  /**
   * Converts this time to a `Date` object using a reference date.
   *
   * The returned date will have the same year/month/day as the reference,
   * but with this time’s hour and minute.
   *
   * @param referenceDate - The base date to apply this time to.
   * @returns A `Date` with this time applied.
   *
   * @example
   * const date = new Date("2025-06-01T00:00:00");
   * Time.create("13:30").toDate(date); // 2025-06-01T13:30:00
   */
  public toDate(referenceDate: Date): Date {
    const hours = Math.floor(this._minutes / 60);
    const minutes = this._minutes % 60;

    const clone = new Date(referenceDate);
    clone.setHours(hours, minutes, 0, 0);

    return clone;
  }

  /**
   * Checks if this time is less than or equal to another.
   */
  public isLessOrEqual(other: Time): boolean {
    return this._minutes <= other._minutes;
  }

  /**
   * Checks if this time is greater than or equal to another.
   */
  public isGreaterOrEqual(other: Time): boolean {
    return this._minutes >= other._minutes;
  }

  /**
   * Returns a new `Time` advanced by the given number of minutes.
   */
  public addMinutes(minutes: number): Time {
    return Time.create(this._minutes + minutes);
  }

  /**
   * Returns a new `Time` moved back by the given number of minutes.
   */
  public subMinutes(minutes: number): Time {
    return Time.create(this._minutes - minutes);
  }

  /**
   * Returns a new `Time` advanced by the given number of hours.
   */
  public addHours(hours: number): Time {
    return Time.create(this._minutes + hours * 60);
  }

  /**
   * Returns a new `Time` moved back by the given number of hours.
   */
  public subHours(hours: number): Time {
    return Time.create(this._minutes - hours * 60);
  }

  /**
   * Checks if the time is evenly divisible by a given number.
   *
   * Useful for determining valid slot intervals (e.g., 30-min slots).
   */
  public isDivisibleBy(divisor: number): boolean {
    return this._minutes % divisor === 0;
  }

  // === Getters ===

  /**
   * The total number of minutes since midnight (0–1439).
   */
  get minutes(): number {
    return this._minutes;
  }

  /**
   * The minute part (0–59).
   */
  get minute(): number {
    return this._minutes % 60;
  }

  /**
   * The time represented in milliseconds.
   */
  get milliseconds(): number {
    return this._minutes * 60 * 1000;
  }

  /**
   * The hour part (0–23).
   */
  get hour(): number {
    return Math.floor(this._minutes / 60);
  }

  /**
   * The `"HH:mm"` formatted string representation of this time.
   */
  get formatted(): string {
    const hours = this.hour.toString().padStart(2, "0");
    const minutes = this.minute.toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
}
