import { z } from "zod";

export const timeDateSchema = z.date({
  required_error: "Time (Date) is required",
  invalid_type_error: "Time (Date) must be a valid Date object",
});

export const timeStringSchema = z
  .string({
    required_error: "Time (HH:mm) string is required",
    invalid_type_error: "Time (HH:mm) string must be a string",
  })
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Time must be in HH:MM format",
  });

export const timeNumberSchema = z
  .number({
    required_error: "Time (in minutes) is required",
    invalid_type_error: "Time (in minutes) must be a number",
  })
  .int("Time (in minutes) must be an integer")
  .min(0, "Time (in minutes) must be greater than 0")
  .max(1439, "Time (in minutes) must be between 0 and 1439");

export type TimeInput =
  | z.infer<typeof timeDateSchema>
  | z.infer<typeof timeStringSchema>
  | z.infer<typeof timeNumberSchema>;
