import { idSchema } from "@/domain/types/shared-types/id.types";
import { Time } from "@/domain/value-objects/time.vo";
import { z } from "zod";

export const partialWorkShiftSchema = z.object({
  id: idSchema("shift").optional(),
});

export const requiredWorkShiftSchema = z.object({
  workdayId: idSchema("workday"),
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
