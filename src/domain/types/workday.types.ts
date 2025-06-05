import { z } from "zod";
import { WorkShift } from "../entities/work-shift.entity";

export const partialWorkdaySchema = z.object({
  id: z
    .string({
      required_error: "Id is required",
      invalid_type_error: "Id must be a string",
    })
    .length(21, "Id must be 21 characters long")
    .optional(),
});

export const requiredWorkdaySchema = z.object({
  barberId: z
    .string({
      required_error: "BarberId is required",
      invalid_type_error: "BarberId must be a string",
    })
    .length(21, "BarberId must be 21 characters long"),
  weekday: z
    .number({
      required_error: "Weekday is required",
      invalid_type_error: "Weekday must be a string",
    })
    .int("Weekday must be an integer")
    .min(0)
    .max(6),
  workShifts: z
    .array(
      z.instanceof(WorkShift, {
        message: "Item must be a WorkShift",
      }),
      {
        invalid_type_error: "WorkShifts must be an array",
        required_error: "WorkShifts is required",
      }
    )
    .min(1),
});

export type PartialWorkdayProps = z.infer<typeof partialWorkdaySchema>;
export type RequiredWorkdayProps = z.infer<typeof requiredWorkdaySchema>;
export type WorkdayProps = PartialWorkdayProps & RequiredWorkdayProps;
export const workdaySchema = partialWorkdaySchema.merge(requiredWorkdaySchema);
