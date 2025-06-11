import { z } from "zod";

const allowedChars = /^[A-Za-z0-9!@#$%^&*()_\-+=.]+$/;

export const passwordSchema = z
  .string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  })
  .min(6, "Password must have at least 6 characters")
  .max(60, "Password must have at most 60 characters")
  .refine((val) => /[a-zA-Z]/.test(val), {
    message: "Password must contain at least one letter",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Password must contain at least one number",
  })
  .refine((val) => allowedChars.test(val), {
    message:
      "Password contains invalid characters. Use only letters, numbers, and these symbols: !@#$%^&*()_-+=.",
  });
