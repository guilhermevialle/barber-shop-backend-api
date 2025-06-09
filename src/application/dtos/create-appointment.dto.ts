import { idSchema } from "@/domain/utils/id-schema";
import { z } from "zod";

export const createAppointmentDtoSchema = z.object({
  barberId: idSchema("barber"),
  customerId: idSchema("customer"),
  serviceId: idSchema("service"),
  startAt: z.coerce.date(),
});

export type CreateAppointmentDto = z.infer<typeof createAppointmentDtoSchema>;
