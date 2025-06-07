import { Workday } from "@/domain/entities/workday.entity";
import { Time } from "@/domain/value-objects/time.vo";
import { IIdGeneratorService } from "@/interfaces/services/id-generator-service.interface";
import { WorkShift } from "../entities/work-shift.entity";

type RawShift = {
  startTime: string;
  endTime: string;
};

type Params = {
  barberId: string;
  between: [number, number]; // exemplo: [1, 5]
  shifts: RawShift[];
};

export class WorkdayFactory {
  constructor(private readonly idGenerator: IIdGeneratorService) {}

  createMany({ barberId, between, shifts }: Params): Workday[] {
    const [startWeekday, endWeekday] = between;

    const weekdays = Array.from(
      { length: endWeekday - startWeekday + 1 },
      (_, i) => startWeekday + i
    );

    return weekdays.map((weekday) => {
      const workdayId = this.idGenerator.generateDefault();

      const workShifts = shifts.map((shift) =>
        WorkShift.restore({
          id: this.idGenerator.generateDefault(),
          workdayId,
          startTime: Time.create(shift.startTime),
          endTime: Time.create(shift.endTime),
        })
      );

      return Workday.restore({
        id: workdayId,
        barberId,
        weekday,
        shifts: workShifts,
      });
    });
  }
}
