import { usernameSchema } from "@/domain/types/value-object-types/username.types";
import { z } from "zod";

export const createBarberDtoSchema = z.object({
  name: z.string(),
  username: usernameSchema,
  workdays: z
    .array(
      z.object({
        weekday: z.number(),
        shifts: z
          .array(
            z.object({
              startTime: z.string(),
              endTime: z.string(),
            })
          )
          .nonempty(),
      })
    )
    .min(0)
    .max(7),
});

export type CreateBarberDto = z.infer<typeof createBarberDtoSchema>;
