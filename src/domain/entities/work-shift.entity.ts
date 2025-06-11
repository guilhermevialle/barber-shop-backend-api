import { InvalidTimeError } from "../errors/shared-errors";
import { idGeneratorService } from "../services/id-generator.service";
import {
  RequiredWorkShiftProps,
  WorkShiftProps,
  workShiftSchema,
} from "../types/entity-types/work-shift.types";
import { Time } from "../value-objects/time.vo";

export class WorkShift {
  private props: Required<WorkShiftProps>;

  constructor(props: WorkShiftProps) {
    this.props = {
      ...props,
      id: props.id ?? idGeneratorService.generateDefault(),
    };

    workShiftSchema.parse(this.props);
    this.validate();
  }

  // private methods
  private validate() {
    if (this.props.startTime.minutes % 30 !== 0)
      throw new InvalidTimeError("Start time must be a multiple of 30 minutes");

    if (this.props.endTime.minutes % 30 !== 0)
      throw new InvalidTimeError("End time must be a multiple of 30 minutes");

    if (this.props.endTime.isBefore(this.props.startTime))
      throw new InvalidTimeError("End time must be after start time");

    if (this.props.endTime.isEqual(this.props.startTime))
      throw new InvalidTimeError("End time must be different from start time");

    if (
      this.props.endTime.subMinutes(this.props.startTime.minutes).minutes < 30
    )
      throw new InvalidTimeError(
        "End time must be at least 30 minutes after start time"
      );
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
    return {
      ...this.props,
      startTime: this.props.startTime.formatted,
      endTime: this.props.endTime.formatted,
    };
  }

  public isTimeBetween(time: Time) {
    return time.isBetween(this.props.startTime, this.props.endTime);
  }

  // getters
  get id() {
    return this.props.id;
  }

  get workdayId() {
    return this.props.workdayId;
  }

  get startTime() {
    return this.props.startTime;
  }

  get endTime() {
    return this.props.endTime;
  }
}
