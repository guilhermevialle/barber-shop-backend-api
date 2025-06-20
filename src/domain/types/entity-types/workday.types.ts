import { WorkShift } from "@/domain/entities/work-shift.entity";
import { idSchema } from "@/domain/types/shared-types/id.types";
import { z } from "zod";

export const partialWorkdaySchema = z.object({
  id: idSchema("workday").optional(),
});

export const requiredWorkdaySchema = z.object({
  barberId: idSchema("barber"),
  weekday: z
    .number({
      required_error: "Weekday is required",
      invalid_type_error: "Weekday must be a string",
    })
    .int("Weekday must be an integer")
    .min(0)
    .max(6),
  shifts: z
    .array(
      z.instanceof(WorkShift, {
        message: "Item must be a WorkShift",
      }),
      {
        invalid_type_error: "WorkShifts must be an array",
        required_error: "WorkShifts is required",
      }
    )
    .min(1, "WorkShifts must have at least one item"),
});

export type PartialWorkdayProps = z.infer<typeof partialWorkdaySchema>;
export type RequiredWorkdayProps = z.infer<typeof requiredWorkdaySchema>;
export type WorkdayProps = PartialWorkdayProps & RequiredWorkdayProps;
export const workdaySchema = partialWorkdaySchema.merge(requiredWorkdaySchema);
