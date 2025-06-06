import { TimeInput } from "../types/time.types";
import { parseTimeInput } from "../utils/parse-time-input";

export class Time {
  private _minutes: number;

  constructor(input: TimeInput) {
    this._minutes = parseTimeInput(input);
  }

  /**
   * Creates a `Time` instance from one of the supported formats.
   *
   * @param input - Time input. Accepted formats:
   * - A `Date` object → e.g. `new Date('2025-06-05T08:30:00')`
   * - A `"HH:mm"` formatted string → e.g. `"08:30"`
   * - A number between 0 and 1439 (minutes since midnight) → e.g. `510`
   *
   * @example
   * Time.create(new Date('2025-06-05T08:30:00'))
   * Time.create("08:30")
   * Time.create(510)
   */
  static create(input: TimeInput): Time {
    return new Time(input);
  }

  // public methods
  public isAfter(time: Time): boolean {
    return this._minutes > time._minutes;
  }

  public isBefore(time: Time): boolean {
    return this._minutes < time._minutes;
  }

  public isEqual(time: Time): boolean {
    return this._minutes === time._minutes;
  }

  public isBetween(start: Time, end: Time): boolean {
    return this._minutes >= start._minutes && this._minutes <= end._minutes;
  }

  public toString(): string {
    return this.formatted;
  }

  public toDate(referenceDate: Date): Date {
    const hours = Math.floor(this._minutes / 60);
    const minutes = this._minutes % 60;

    referenceDate.setHours(hours, minutes, 0, 0);

    return referenceDate;
  }

  public isLessOrEqual(time: Time): boolean {
    return this._minutes <= time._minutes;
  }

  public addMinutes(minutes: number): Time {
    return Time.create(this._minutes + minutes);
  }

  public subMinutes(minutes: number): Time {
    return Time.create(this._minutes - minutes);
  }

  public addHours(hours: number): Time {
    return Time.create(this._minutes + hours * 60);
  }

  public subHours(hours: number): Time {
    return Time.create(this._minutes - hours * 60);
  }

  // getters
  get minutes(): number {
    return this._minutes;
  }

  get minute(): number {
    return this._minutes % 60;
  }

  get milliseconds(): number {
    return this._minutes * 60 * 1000;
  }

  get hour(): number {
    return Math.floor(this._minutes / 60);
  }

  get formatted(): string {
    const hours = this.hour.toString().padStart(2, "0");
    const minutes = (this.minutes % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
}
