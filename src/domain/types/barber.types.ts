import { z } from "zod";
import { Workday } from "../entities/workday.entity";
import { idSchema } from "../utils/id-schema";
import { Username } from "../value-objects/username.vo";

export const partialBarberSchema = z.object({
  id: idSchema().optional(),
});

export const requiredBarberSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3)
    .max(50),
  username: z.instanceof(Username, {
    message: "Username must be a valid Username",
  }),
  workdays: z
    .array(
      z.instanceof(Workday, {
        message: "Item must be a Workday",
      }),
      {
        invalid_type_error: "Workdays must be an array of Workdays",
        required_error: "Workdays is required",
      }
    )
    .min(0)
    .max(7, "Workdays must be between 0 and 7"),
});

export type PartialBarberProps = z.infer<typeof partialBarberSchema>;
export type RequiredBarberProps = z.infer<typeof requiredBarberSchema>;
export type BarberProps = PartialBarberProps & RequiredBarberProps;
export const barberSchema = partialBarberSchema.merge(requiredBarberSchema);
