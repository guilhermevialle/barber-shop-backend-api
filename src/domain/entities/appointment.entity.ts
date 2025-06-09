import { addMinutes } from "date-fns";
import { idGeneratorService } from "../services/id-generator.service";
import {
  AppointmentProps,
  appointmentSchema,
  RequiredAppointmentProps,
} from "../types/appointment.types";
import { Time } from "../value-objects/time.vo";

export class Appointment {
  private props: Required<AppointmentProps>;

  constructor(props: AppointmentProps) {
    this.props = {
      ...props,
      id: props.id ?? idGeneratorService.generateDefault(),
    };

    appointmentSchema.required().parse(this.props);
  }

  // static methods
  static create(props: RequiredAppointmentProps) {
    return new Appointment(props);
  }

  static restore(props: Required<AppointmentProps>) {
    const parsed = appointmentSchema.parse(props);
    return new Appointment(parsed);
  }

  // public methods
  public toJSON(): AppointmentProps {
    return this.props;
  }

  public isBetweenDateRange(
    startAt: Date,
    endAt: Date,
    inclusive: boolean = true
  ) {
    if (inclusive)
      return this.props.startAt >= startAt && this.props.startAt <= endAt;

    return this.props.startAt > startAt && this.props.startAt < endAt;
  }

  public isBetweenTimeRange(
    time1: Time,
    time2: Time,
    inclusive: boolean = true
  ) {
    const time = Time.create(this.props.startAt);
    return time.isBetween(time1, time2, inclusive);
  }

  public conflictsWith(other: Appointment, inclusive: boolean = false) {
    return (
      this.isBetweenDateRange(other.startAt, other.endAt, inclusive) ||
      other.isBetweenDateRange(this.startAt, this.endAt, inclusive)
    );
  }

  // getters
  get id() {
    return this.props.id;
  }

  get barberId() {
    return this.props.barberId;
  }

  get customerId() {
    return this.props.customerId;
  }

  get serviceId() {
    return this.props.serviceId;
  }

  get startAt() {
    return this.props.startAt;
  }

  get durationInMinutes() {
    return this.props.durationInMinutes;
  }

  get priceInCents() {
    return this.props.priceInCents;
  }

  get endAt() {
    return addMinutes(this.props.startAt, this.props.durationInMinutes);
  }
}
