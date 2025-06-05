import { z } from "zod";

export const partialAppointmentSchema = z.object({
  id: z
    .string({
      required_error: "Id is required",
      invalid_type_error: "Id must be a string",
    })
    .optional(),
});

export const requiredAppointmentSchema = z.object({
  customerId: z
    .string({
      required_error: "CustomerId is required",
      invalid_type_error: "CustomerId must be a string",
    })
    .length(21),
  barberId: z
    .string({
      required_error: "BarberId is required",
      invalid_type_error: "BarberId must be a string",
    })
    .length(21),
  serviceId: z
    .string({
      required_error: "ServiceId is required",
      invalid_type_error: "ServiceId must be a string",
    })
    .length(21),
  startAt: z.date({
    required_error: "StartAt is required",
    invalid_type_error: "StartAt must be a date",
  }),
  priceInCents: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .int()
    .min(100),
  durationInMinutes: z
    .number({
      required_error: "Duration is required",
      invalid_type_error: "Duration must be a number",
    })
    .int()
    .min(30)
    .max(90)
    .refine((value) => value % 30 === 0, "Duration must be a multiple of 30"),
});

export type PartialAppointmentProps = z.infer<typeof partialAppointmentSchema>;
export type RequiredAppointmentProps = z.infer<
  typeof requiredAppointmentSchema
>;
export type AppointmentProps = PartialAppointmentProps &
  RequiredAppointmentProps;
export const appointmentSchema = partialAppointmentSchema.merge(
  requiredAppointmentSchema
);
