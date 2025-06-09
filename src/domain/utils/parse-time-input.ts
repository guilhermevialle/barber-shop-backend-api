import { InvalidInputError } from "../errors/shared-errors";
import {
  timeDateSchema,
  TimeInput,
  timeNumberSchema,
  timeStringSchema,
} from "../types/time.types";

export function parseTimeInput(input: TimeInput): number {
  if (input instanceof Date) {
    const result = timeDateSchema.safeParse(input);

    if (result.error) throw new InvalidInputError(result.error.message);

    return input.getHours() * 60 + input.getMinutes();
  }

  if (typeof input === "string") {
    const result = timeStringSchema.safeParse(input);

    if (result.error) throw new InvalidInputError(result.error.message);

    const [hh, mm] = input.split(":").map(Number);
    return hh * 60 + mm;
  }

  if (typeof input === "number") {
    const result = timeNumberSchema.safeParse(input);

    if (result.error) throw new InvalidInputError(result.error.message);

    return input;
  }

  throw new Error("Invalid time input");
}
