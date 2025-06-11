import { idSchema } from "@/domain/types/shared-types/id.types";
import { z } from "zod";

export const findBarberAvailabilityDtoSchema = z.object({
  id: idSchema("barber"),
  date: z.coerce.date(),
});

export type FindBarberAvailabilityDto = z.infer<
  typeof findBarberAvailabilityDtoSchema
>;
