import { idGeneratorService } from "../services/id-generator.service";
import {
  BarberProps,
  barberSchema,
  RequiredBarberProps,
} from "../types/barber.types";

export class Barber {
  private props: Required<BarberProps>;

  constructor(props: BarberProps) {
    this.props = {
      ...props,
      id: props.id ?? idGeneratorService.generateDefault(),
    };

    barberSchema.parse(this.props);
  }

  // static methods
  static create(props: RequiredBarberProps): Barber {
    return new Barber(props);
  }

  static restore(props: Required<BarberProps>) {
    const parsed = barberSchema.parse(props);
    return new Barber(parsed);
  }

  // public methods
  public toJSON(): BarberProps {
    return this.props;
  }

  // getters
}
