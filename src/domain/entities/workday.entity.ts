import { idGeneratorService } from "../services/id-generator.service";
import {
  RequiredWorkdayProps,
  WorkdayProps,
  workdaySchema,
} from "../types/workday.types";
import { WorkShift } from "./work-shift.entity";

export class Workday {
  private props: Required<WorkdayProps>;

  constructor(props: WorkdayProps) {
    this.props = {
      ...props,
      id: props.id ?? idGeneratorService.generateDefault(),
    };

    workdaySchema.parse(this.props);
  }

  // static methods
  static create(props: RequiredWorkdayProps) {
    return new Workday(props);
  }

  static restore(props: Required<WorkdayProps>) {
    const parsed = workdaySchema.parse(props);
    return new Workday(parsed);
  }

  // private methods
  private hasShift(id: string) {
    return this.props.shifts.some((shift) => shift.id === id);
  }

  private findShiftIndex(id: string): number {
    return this.props.shifts.findIndex((shift) => shift.id === id);
  }

  // public methods
  public toJSON() {
    return {
      ...this.props,
      shifts: this.props.shifts.map((shift) => shift.toJSON()),
    };
  }

  public addShift(shift: WorkShift) {
    if (this.hasShift(shift.id)) return this.updateShift(shift);

    this.props.shifts.push(shift);
  }

  public updateShift(shift: WorkShift) {
    const index = this.findShiftIndex(shift.id);

    if (index !== -1) this.props.shifts[index] = shift;
  }

  public removeShift(shift: WorkShift) {
    const index = this.findShiftIndex(shift.id);

    if (index !== -1) this.props.shifts.splice(index, 1);
  }

  public addShifts(shifts: WorkShift[]) {
    shifts.forEach((shift) => this.addShift(shift));
  }

  // getters
  get id() {
    return this.props.id;
  }

  get barberId() {
    return this.props.barberId;
  }

  get weekday() {
    return this.props.weekday;
  }

  get shifts() {
    return this.props.shifts;
  }
}
