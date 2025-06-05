import {
  timeDateSchema,
  TimeInput,
  timeNumberSchema,
  timeStringSchema,
} from "../types/time.types";

export function parseTimeInput(input: TimeInput): number {
  if (input instanceof Date) {
    timeDateSchema.parse(input);
    return input.getHours() * 60 + input.getMinutes();
  }

  if (typeof input === "string") {
    timeStringSchema.parse(input);
    const [hh, mm] = input.split(":").map(Number);
    return hh * 60 + mm;
  }

  if (typeof input === "number") {
    timeNumberSchema.parse(input);
    return input;
  }

  throw new Error("Invalid time input");
}
