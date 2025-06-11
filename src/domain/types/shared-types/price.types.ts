import { z } from "zod";

const MIN_PRICE_IN_CENTS = 100;

export const priceInCentsSchema = z
  .number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  })
  .int("Price must be an integer")
  .min(MIN_PRICE_IN_CENTS, `Price must be at least ${MIN_PRICE_IN_CENTS}`);
