import { Workday } from "@/domain/entities/workday.entity";
import { IIdGeneratorService } from "@/domain/interfaces/services/id-generator-service.interface";
import { Time } from "@/domain/value-objects/time.vo";
import { WorkShift } from "../entities/work-shift.entity";

interface Props {
  barberId: string;
  between: [number, number];
  shifts: Array<{
    startTime: string;
    endTime: string;
  }>;
}

export class WorkdayFactory {
  constructor(private readonly idGenerator: IIdGeneratorService) {}

  createMany({ barberId, between, shifts }: Props): Workday[] {
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
