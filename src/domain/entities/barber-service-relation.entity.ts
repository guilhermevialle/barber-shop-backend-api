import { idGeneratorService } from "../services/id-generator.service";
import {
  BarberServiceRelationProps,
  barberServiceRelationSchema,
  RequiredBarberServiceRelationProps,
} from "../types/entity-types/barber-service-relation.types";

export class BarberServiceRelation {
  private props: Required<BarberServiceRelationProps>;

  constructor(props: BarberServiceRelationProps) {
    this.props = {
      ...props,
      id: props.id ?? idGeneratorService.generateDefault(),
    };

    barberServiceRelationSchema.parse(this.props);
  }

  // static methods
  static create(props: RequiredBarberServiceRelationProps) {
    return new BarberServiceRelation(props);
  }

  static restore(props: Required<BarberServiceRelationProps>) {
    const parsed = barberServiceRelationSchema.parse(props);
    return new BarberServiceRelation(parsed);
  }

  // public methods
  public toJSON() {
    return this.props;
  }

  // getters
  get id() {
    return this.props.id;
  }

  get barberId() {
    return this.props.barberId;
  }

  get serviceId() {
    return this.props.serviceId;
  }
}
