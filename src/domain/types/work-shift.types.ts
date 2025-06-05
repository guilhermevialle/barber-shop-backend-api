import { z } from "zod";
import { Time } from "../value-objects/time.vo";

export const partialWorkShiftSchema = z.object({
  id: z
    .string({
      required_error: "Id is required",
      invalid_type_error: "Id must be a string",
    })
    .length(21)
    .optional(),
});

export const requiredWorkShiftSchema = z.object({
  workdayId: z
    .string({
      required_error: "WorkdayId is required",
      invalid_type_error: "WorkdayId must be a string",
    })
    .length(21, "WorkdayId must be 21 characters long"),
  startTime: z.instanceof(Time, {
    message: "Start time must be a valid Time",
  }),
  endTime: z.instanceof(Time, {
    message: "End time must be a valid Time",
  }),
});

export type PartialWorkShiftProps = z.infer<typeof partialWorkShiftSchema>;
export type RequiredWorkShiftProps = z.infer<typeof requiredWorkShiftSchema>;
export type WorkShiftProps = PartialWorkShiftProps & RequiredWorkShiftProps;
export const workShiftSchema = partialWorkShiftSchema.merge(
  requiredWorkShiftSchema
);
