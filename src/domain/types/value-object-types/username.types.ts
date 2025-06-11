import { z } from "zod";

export const usernameSchema = z
  .string({
    invalid_type_error: "Username must be a string",
    required_error: "Username is required",
  })
  .min(3, "Username must have at least 3 characters")
  .max(20, "Username must have at most 20 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username must only contain letters, numbers and underscores"
  );
