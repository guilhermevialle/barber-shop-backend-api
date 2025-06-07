import { z } from "zod";
import { idSchema } from "../utils/id-schema";
import { Time } from "../value-objects/time.vo";

export const partialWorkShiftSchema = z.object({
  id: idSchema().optional(),
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
