import { Workday } from "../entities/workday.entity";
import { MismatchBarberError } from "../errors/barber-errors";
import { idGeneratorService } from "../services/id-generator.service";
import {
  BarberProps,
  barberSchema,
  RequiredBarberProps,
} from "../types/aggregate-types/barber.types";

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

  // private methods
  private hasWorkday(weekday: number): boolean {
    return this.props.workdays.some((workday) => workday.weekday === weekday);
  }

  private findWorkdayIndex(weekday: number): number {
    return this.props.workdays.findIndex(
      (workday) => workday.weekday === weekday
    );
  }

  private isBarberIdMatch(id: string): boolean {
    return this.id == id;
  }

  // public methods
  public toJSON() {
    return {
      ...this.props,
      username: this.props.username.value,
      workdays: this.props.workdays.map((workday) => workday.toJSON()),
    };
  }

  public updateWorkday(workday: Workday) {
    if (!this.isBarberIdMatch(workday.barberId))
      throw new MismatchBarberError(
        `[Update]: Workday does not belong to this barber.`
      );

    const index = this.findWorkdayIndex(workday.weekday);

    if (index !== -1) this.props.workdays[index] = workday;
  }

  public addWorkdays(workdays: Workday[]) {
    workdays.forEach((workday) => this.addWorkday(workday));
  }

  public addWorkday(workday: Workday) {
    if (!this.isBarberIdMatch(workday.barberId))
      throw new MismatchBarberError(
        `[Add]: Workday does not belong to this barber.`
      );

    if (this.hasWorkday(workday.weekday)) return this.updateWorkday(workday);

    this.props.workdays.push(workday);
  }

  public removeWorkday(workday: Workday) {
    if (!this.isBarberIdMatch(workday.barberId))
      throw new MismatchBarberError(
        `[Remove]: Workday does not belong to this barber.`
      );

    const index = this.findWorkdayIndex(workday.weekday);

    if (index !== -1) this.props.workdays.splice(index, 1);
  }

  public isNotWorking() {
    return this.props.workdays.length === 0;
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
