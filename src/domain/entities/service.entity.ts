import { idGeneratorService } from "../services/id-generator.service";
import {
  RequiredServiceProps,
  ServiceProps,
  serviceSchema,
} from "../types/service.types";

export class Service {
  private props: Required<ServiceProps>;

  constructor(props: ServiceProps) {
    this.props = {
      ...props,
      id: props.id ?? idGeneratorService.generateDefault(),
    };

    serviceSchema.parse(this.props);
  }

  // static methods
  static create(props: RequiredServiceProps) {
    return new Service(props);
  }

  static restore(props: Required<ServiceProps>) {
    const parsed = serviceSchema.parse(props);
    return new Service(parsed);
  }

  // public methods
  public toJSON(): ServiceProps {
    return this.props;
  }

  // getters
  get id() {
    return this.props.id;
  }

  get type() {
    return this.props.type;
  }

  get priceInCents() {
    return this.props.priceInCents;
  }

  get durationInMinutes() {
    return this.props.durationInMinutes;
  }
}
