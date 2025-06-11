import { idGeneratorService } from "../services/id-generator.service";
import {
  BarberServiceProps,
  barberServiceSchema,
  RequiredBarberServiceProps,
} from "../types/service-types/barber-service.types";

export class BarberService {
  private props: Required<BarberServiceProps>;

  constructor(props: BarberServiceProps) {
    this.props = {
      ...props,
      id: props.id ?? idGeneratorService.generateDefault(),
    };

    barberServiceSchema.parse(this.props);
  }

  // static methods
  static create(props: RequiredBarberServiceProps) {
    return new BarberService(props);
  }

  static restore(props: Required<BarberServiceProps>) {
    const parsed = barberServiceSchema.parse(props);
    return new BarberService(parsed);
  }

  // public methods
  public toJSON(): BarberServiceProps {
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
