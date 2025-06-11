import { passwordSchema } from "@/domain/types/value-object-types/password.types";
import { usernameSchema } from "@/domain/types/value-object-types/username.types";
import { z } from "zod";

export const createCustomerDtoSchema = z.object({
  name: z.string(),
  username: usernameSchema,
  password: passwordSchema,
});

export type CreateCustomerDto = z.infer<typeof createCustomerDtoSchema>;
