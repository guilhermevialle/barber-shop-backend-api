import { Barber } from "@/domain/aggregates/barber.aggregate";
import { WorkShift } from "@/domain/entities/work-shift.entity";
import { Workday } from "@/domain/entities/workday.entity";

export interface IBarberRepository {
  save(customer: Barber): Promise<void>;
  update(customer: Barber): Promise<void>;
  findById(id: string): Promise<Barber | null>;
  findByUsername(username: string): Promise<Barber | null>;
  findWorkdaysById(id: string): Promise<Workday[]>;
  findWorkShiftsByWeekdayAndId(
    id: string,
    weekday: number
  ): Promise<WorkShift[]>;
  findAll(): Promise<Barber[]>;
  clear(): Promise<void>;
}
