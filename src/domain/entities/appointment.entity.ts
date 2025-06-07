import { addMinutes } from "date-fns";
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
