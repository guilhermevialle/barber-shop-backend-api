import { addMinutes } from "date-fns";
import { idGeneratorService } from "../services/id-generator.service";
import {
  AppointmentProps,
  appointmentSchema,
  RequiredAppointmentProps,
} from "../types/appointment.types";
import { Time } from "../value-objects/time.vo";

/**
 * Represents a scheduled appointment with a barber.
 *
 * Handles validation, creation, and time conflict checks.
 *
 * @example
 * const appointment = Appointment.create({
 *   id: "abc123",
 *   barberId: "barber1",
 *   customerId: "customer1",
 *   serviceId: "service1",
 *   startAt: new Date('2025-06-05T08:30:00'),
 *   durationInMinutes: 30,
 *   priceInCents: 2500,
 * });
 */
export class Appointment {
  private props: Required<AppointmentProps>;

  /**
   * Creates a new Appointment instance, validating required properties.
   * Generates a default `id` if none is provided.
   *
   * @param props - Appointment properties.
   */
  constructor(props: AppointmentProps) {
    this.props = {
      ...props,
      id: props.id ?? idGeneratorService.generateDefault(),
    };

    appointmentSchema.required().parse(this.props);
  }

  /**
   * Creates a new Appointment from required properties.
   *
   * @param props - Required appointment properties.
   * @returns New Appointment instance.
   */
  static create(props: RequiredAppointmentProps) {
    return new Appointment(props);
  }

  /**
   * Restores an Appointment instance from complete properties (e.g., loaded from DB).
   *
   * @param props - Complete appointment properties.
   * @returns Restored Appointment instance.
   */
  static restore(props: Required<AppointmentProps>) {
    const parsed = appointmentSchema.parse(props);
    return new Appointment(parsed);
  }

  /**
   * Serializes the appointment properties for JSON/stringification.
   *
   * @returns The raw appointment properties object.
   */
  public toJSON(): AppointmentProps {
    return this.props;
  }

  /**
   * Checks if the appointment's start date is within a given date range.
   *
   * @param startAt - Start of the date range.
   * @param endAt - End of the date range.
   * @param inclusive - Include bounds in check (default: true).
   * @returns True if appointment start is within the range.
   */
  public isBetweenDateRange(
    startAt: Date,
    endAt: Date,
    inclusive: boolean = true
  ) {
    if (inclusive)
      return this.props.startAt >= startAt && this.props.startAt <= endAt;

    return this.props.startAt > startAt && this.props.startAt < endAt;
  }

  /**
   * Checks if the appointment's start time is within a given time range.
   *
   * @param start - Start of the time range as `Time` value object.
   * @param end - End of the time range as `Time` value object.
   * @param inclusive - Include bounds in check (default: true).
   * @returns True if appointment time is within the range.
   */
  public isBetweenTimeRange(start: Time, end: Time, inclusive: boolean = true) {
    const time = Time.create(this.props.startAt);
    return time.isBetween(start, end, inclusive);
  }

  /**
   * Checks if this appointment conflicts with another appointment by overlapping times.
   *
   * @param other - Another appointment to check conflict against.
   * @param inclusive - Whether boundaries are considered overlapping (default: false).
   * @returns True if appointments conflict.
   */
  public conflictsWith(other: Appointment, inclusive: boolean = false) {
    return (
      this.isBetweenDateRange(other.startAt, other.endAt, inclusive) ||
      other.isBetweenDateRange(this.startAt, this.endAt, inclusive)
    );
  }

  // Getters for appointment properties

  /** Appointment unique identifier */
  get id() {
    return this.props.id;
  }

  /** Identifier of the barber */
  get barberId() {
    return this.props.barberId;
  }

  /** Identifier of the customer */
  get customerId() {
    return this.props.customerId;
  }

  /** Identifier of the service */
  get serviceId() {
    return this.props.serviceId;
  }

  /** Start date and time of the appointment */
  get startAt() {
    return this.props.startAt;
  }

  /** Duration of the appointment in minutes */
  get durationInMinutes() {
    return this.props.durationInMinutes;
  }

  /** Price of the appointment in cents */
  get priceInCents() {
    return this.props.priceInCents;
  }

  /**
   * Calculates the appointment end time based on start time and duration.
   *
   * @returns Date object representing the appointment end time.
   */
  get endAt() {
    return addMinutes(this.props.startAt, this.props.durationInMinutes);
  }
}
