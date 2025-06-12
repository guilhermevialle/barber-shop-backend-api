import { addMinutes, differenceInMinutes, isPast } from "date-fns";
import {
  AppointmentAlreadyExpiredError,
  AppointmentTooCloseError,
  getStatusError,
} from "../errors/appointment-errors";
import { idGeneratorService } from "../services/id-generator.service";
import {
  AppointmentProps,
  appointmentSchema,
  AppointmentStatus,
  RequiredAppointmentProps,
} from "../types/entity-types/appointment.types";
import { Time } from "../value-objects/time.vo";

export class Appointment {
  private props: Required<AppointmentProps>;

  constructor(props: AppointmentProps) {
    this.props = {
      ...props,
      id: props.id ?? idGeneratorService.generateDefault(),
      status: props.status ?? AppointmentStatus.CONFIRMED,
    };

    appointmentSchema.required().parse(this.props);
  }

  // private methods
  private updateStatus(status: AppointmentStatus) {
    this.props.status = status;
  }

  private hasExpired() {
    return isPast(this.endAt);
  }

  // static methods
  static create(props: RequiredAppointmentProps) {
    return new Appointment(props);
  }

  static restore(props: Required<AppointmentProps>) {
    const parsed = appointmentSchema.required().parse(props);
    return new Appointment(parsed);
  }

  // public methods
  public toJSON(): AppointmentProps {
    return this.props;
  }

  public cancel() {
    if (this.props.status !== AppointmentStatus.CONFIRMED) {
      const Error = getStatusError(this.props.status);
      throw Error();
    }

    if (this.hasExpired()) throw new AppointmentAlreadyExpiredError();

    const minutes = differenceInMinutes(this.startAt, new Date());

    if (minutes <= 10)
      throw new AppointmentTooCloseError(
        `Cannot cancel 10 minutes before scheduled time`
      );

    this.updateStatus(AppointmentStatus.CANCELLED);
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

  public isBetweenTimeRange(start: Time, end: Time, inclusive: boolean = true) {
    const time = Time.create(this.props.startAt);
    return time.isBetween(start, end, inclusive);
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

  get status() {
    return this.props.status;
  }

  get durationInMinutes() {
    return this.props.durationInMinutes;
  }

  get isExpired() {
    return this.hasExpired();
  }

  get isFinished() {
    return this.props.status === AppointmentStatus.FINISHED;
  }

  get isCancelled() {
    return this.props.status === AppointmentStatus.CANCELLED;
  }

  get isConfirmed() {
    return this.props.status === AppointmentStatus.CONFIRMED;
  }

  get priceInCents() {
    return this.props.priceInCents;
  }

  get endAt() {
    return addMinutes(this.props.startAt, this.props.durationInMinutes);
  }
}
