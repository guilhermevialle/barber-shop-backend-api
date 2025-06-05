import { z } from "zod";
import { Username } from "../value-objects/username.vo";

export const partialCustomerSchema = z.object({
  id: z
    .string({
      required_error: "Id is required",
      invalid_type_error: "Id must be a string",
    })
    .length(21, "Id must be 21 characters long")
    .optional(),
});

export const requiredCustomerSchema = z.object({
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
});

export type PartialCustomerProps = z.infer<typeof partialCustomerSchema>;
export type RequiredCustomerProps = z.infer<typeof requiredCustomerSchema>;
export type CustomerProps = PartialCustomerProps & RequiredCustomerProps;
export const customerSchema = partialCustomerSchema.merge(
  requiredCustomerSchema
);
