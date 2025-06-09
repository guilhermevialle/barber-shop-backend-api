import { usernameSchema } from "@/domain/types/username.types";
import { z } from "zod";

export const createCustomerDtoSchema = z.object({
  name: z.string(),
  username: usernameSchema,
});

export type CreateCustomerDto = z.infer<typeof createCustomerDtoSchema>;
