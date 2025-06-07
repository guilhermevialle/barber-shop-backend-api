import { z } from "zod";
import { idSchema } from "../utils/id-schema";

export const partialServiceSchema = z.object({
  id: idSchema().optional(),
});

export const requiredServiceSchema = z.object({
  type: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3)
    .max(50),
  priceInCents: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .min(100),
  durationInMinutes: z
    .number({
      required_error: "Duration is required",
      invalid_type_error: "Duration must be a number",
    })
    .min(30)
    .max(90)
    .refine((value) => value % 30 === 0, "Duration must be a multiple of 30"),
});

export type PartialServiceProps = z.infer<typeof partialServiceSchema>;
export type RequiredServiceProps = z.infer<typeof requiredServiceSchema>;
export type ServiceProps = PartialServiceProps & RequiredServiceProps;
export const serviceSchema = partialServiceSchema.merge(requiredServiceSchema);
