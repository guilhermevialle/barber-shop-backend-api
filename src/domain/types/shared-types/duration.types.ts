import { z } from "zod";

export const MIN_DURATION_IN_MINUTES = 30;
export const MAX_DURATION_IN_MINUTES = 90;
export const DURATION_MULTIPLIER = 15;

export const durationInMinutesSchema = z
  .number({
    required_error: "Duration is required",
    invalid_type_error: "Duration must be a number",
  })
  .int("Duration must be an integer")
  .min(
    MIN_DURATION_IN_MINUTES,
    `Duration must be at least ${MIN_DURATION_IN_MINUTES}`
  )
  .max(
    MAX_DURATION_IN_MINUTES,
    `Duration must be at most ${MAX_DURATION_IN_MINUTES}`
  )
  .refine(
    (dur) => dur % DURATION_MULTIPLIER === 0,
    `Duration must be a multiple of ${DURATION_MULTIPLIER}`
  );
