import { idSchema } from "@/domain/types/shared-types/id.types";
import { Time } from "@/domain/value-objects/time.vo";
import { differenceInDays, isPast } from "date-fns";
import { z } from "zod";
import { durationInMinutesSchema } from "../shared-types/duration.types";
import { priceInCentsSchema } from "../shared-types/price.types";

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
  priceInCents: priceInCentsSchema,
  durationInMinutes: durationInMinutesSchema,
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
