import { addMinutes, isPast } from "date-fns";
import { DateTooLateError, PastDateError } from "../errors/shared-errors";
import { idGeneratorService } from "../services/id-generator.service";
import {
  AppointmentProps,
  appointmentSchema,
  RequiredAppointmentProps,
} from "../types/appointment.types";

export class Appointment {
  private props: Required<AppointmentProps>;

  constructor(props: AppointmentProps) {
    this.props = {
      ...props,
      id: props.id ?? idGeneratorService.generateDefault(),
    };

    appointmentSchema.parse(this.props);
    this.validate();
  }

  // private methods
  private validate() {
    if (isPast(this.props.startAt))
      throw new PastDateError("Start date must be in the future");

    if (this.props.startAt.getTime() > Date.now() + 30 * 24 * 60 * 60 * 1000)
      throw new DateTooLateError("Start date must be in the next 30 days");
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
