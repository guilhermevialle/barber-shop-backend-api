import { idSchema } from "@/domain/types/shared-types/id.types";
import { z } from "zod";
import { durationInMinutesSchema } from "../shared-types/duration.types";
import { priceInCentsSchema } from "../shared-types/price.types";

export const partialServiceSchema = z.object({
  id: idSchema("service").optional(),
});

export const requiredServiceSchema = z.object({
  type: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3)
    .max(50),
  priceInCents: priceInCentsSchema,
  durationInMinutes: durationInMinutesSchema,
});

export type PartialServiceProps = z.infer<typeof partialServiceSchema>;
export type RequiredServiceProps = z.infer<typeof requiredServiceSchema>;
export type ServiceProps = PartialServiceProps & RequiredServiceProps;
export const serviceSchema = partialServiceSchema.merge(requiredServiceSchema);
