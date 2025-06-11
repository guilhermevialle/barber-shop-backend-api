import { idSchema } from "@/domain/types/shared-types/id.types";
import { z } from "zod";

export const partialBarberServiceRelationSchema = z.object({
  id: idSchema().optional(),
});

export const requiredBarberServiceRelationSchema = z.object({
  barberId: idSchema("barber"),
  serviceId: idSchema("service"),
});

export type PartialBarberServiceRelationProps = z.infer<
  typeof partialBarberServiceRelationSchema
>;
export type RequiredBarberServiceRelationProps = z.infer<
  typeof requiredBarberServiceRelationSchema
>;
export type BarberServiceRelationProps = PartialBarberServiceRelationProps &
  RequiredBarberServiceRelationProps;
export const barberServiceRelationSchema =
  partialBarberServiceRelationSchema.merge(requiredBarberServiceRelationSchema);
