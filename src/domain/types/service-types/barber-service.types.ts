import { idSchema } from "@/domain/utils/id-schema";
import { z } from "zod";

export const partialBarberServiceSchema = z.object({
  id: idSchema().optional(),
});

export const requiredBarberServiceSchema = z.object({
  barberId: idSchema("barber"),
  serviceId: idSchema("service"),
});

export type PartialBarberServiceProps = z.infer<
  typeof partialBarberServiceSchema
>;
export type RequiredBarberServiceProps = z.infer<
  typeof requiredBarberServiceSchema
>;
export type BarberServiceProps = PartialBarberServiceProps &
  RequiredBarberServiceProps;
export const barberServiceSchema = partialBarberServiceSchema.merge(
  requiredBarberServiceSchema
);
