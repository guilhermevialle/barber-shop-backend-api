import { idGeneratorService } from "../services/id-generator.service";
import {
  RequiredWorkShiftProps,
  WorkShiftProps,
  workShiftSchema,
} from "../types/work-shift.types";

export class WorkShift {
  private props: Required<WorkShiftProps>;

  constructor(props: WorkShiftProps) {
    this.props = {
      ...props,
      id: props.id ?? idGeneratorService.generateDefault(),
    };

    workShiftSchema.parse(this.props);
  }

  // static methods
  static create(props: RequiredWorkShiftProps) {
    return new WorkShift(props);
  }

  static restore(props: Required<WorkShiftProps>) {
    const parsed = workShiftSchema.parse(props);
    return new WorkShift(parsed);
  }

  // public methods
  public toJSON() {
    return this.props;
  }
}
