import { Workday } from "../entities/workday.entity";
import { idGeneratorService } from "../services/id-generator.service";
import {
  BarberProps,
  barberSchema,
  RequiredBarberProps,
} from "../types/barber.types";

export class Barber {
  private props: Required<BarberProps>;

  constructor(props: BarberProps) {
    this.props = {
      ...props,
      id: props.id ?? idGeneratorService.generateDefault(),
    };

    barberSchema.parse(this.props);
  }

  // static methods
  static create(props: RequiredBarberProps): Barber {
    return new Barber(props);
  }

  static restore(props: Required<BarberProps>) {
    const parsed = barberSchema.parse(props);
    return new Barber(parsed);
  }

  // public methods
  public toJSON(): BarberProps {
    return this.props;
  }

  public updateWorkday(workday: Workday) {
    const index = this.props.workdays.findIndex(
      (w) => w.weekday === workday.weekday
    );

    if (index === -1) return;

    this.props.workdays[index] = workday;
  }

  public addWorkdays(workdays: Workday[]) {
    workdays.forEach((workday) => this.addWorkday(workday));
  }

  public addWorkday(workday: Workday) {
    this.updateWorkday(workday);
    this.props.workdays.push(workday);
  }

  public isWorking() {
    return this.props.workdays.length > 0;
  }

  // getters
  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get workdays() {
    return this.props.workdays;
  }

  get username() {
    return this.props.username;
  }
}
