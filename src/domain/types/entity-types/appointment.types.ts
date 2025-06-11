import { idSchema } from "@/domain/utils/id-schema";
import { Time } from "@/domain/value-objects/time.vo";
import { differenceInDays, isPast } from "date-fns";
import { z } from "zod";

export const partialAppointmentSchema = z.object({
  id: idSchema().optional(),
});

export const requiredAppointmentSchema = z.object({
  customerId: idSchema("customer"),
  barberId: idSchema("barber"),
  serviceId: idSchema("service"),
  startAt: z
    .date({
      required_error: "StartAt is required",
      invalid_type_error: "StartAt must be a date",
    })
    .refine((date) => !isPast(date), {
      message: "Start date must be in the future",
    })
    .refine((date) => differenceInDays(date, new Date()) <= 30, {
      message: "Start date must be in the next 30 days",
    })
    .refine((date) => Time.create(date).isDivisibleBy(15), {
      message: "Start time must be a multiple of 15 minutes",
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
    .refine((value) => value % 15 === 0, "Duration must be a multiple of 15"),
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
