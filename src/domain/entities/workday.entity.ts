import { idGeneratorService } from "../services/id-generator.service";
import {
  RequiredWorkdayProps,
  WorkdayProps,
  workdaySchema,
} from "../types/workday.types";

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

  // public methods
  public toJSON() {
    return this.props;
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
