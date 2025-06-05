import { z } from "zod";

export const partialBarberServiceSchema = z.object({
  id: z
    .string({
      required_error: "Id is required",
      invalid_type_error: "Id must be a string",
    })
    .length(21)
    .optional(),
});

export const requiredBarberServiceSchema = z.object({
  barberId: z
    .string({
      required_error: "BarberId is required",
      invalid_type_error: "BarberId must be a string",
    })
    .length(21, "BarberId must be 21 characters long"),
  serviceId: z
    .string({
      required_error: "ServiceId is required",
      invalid_type_error: "ServiceId must be a string",
    })
    .length(21, "ServiceId must be 21 characters long"),
});


export type PartialBarberServiceProps = z.infer<typeof partialBarberServiceSchema>;
export type RequiredBarberServiceProps = z.infer<typeof requiredBarberServiceSchema>;
export type BarberServiceProps = PartialBarberServiceProps & RequiredBarberServiceProps;
export const barberServiceSchema = partialBarberServiceSchema.merge(requiredBarberServiceSchema);
