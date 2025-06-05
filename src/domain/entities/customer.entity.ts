import { idGeneratorService } from "../services/id-generator.service";
import {
  CustomerProps,
  customerSchema,
  RequiredCustomerProps,
} from "../types/customer.types";

export class Customer {
  private props: Required<CustomerProps>;

  constructor(props: CustomerProps) {
    this.props = {
      ...props,
      id: props.id ?? idGeneratorService.generateDefault(),
    };

    customerSchema.parse(this.props);
  }

  // static methods
  static create(props: RequiredCustomerProps) {
    return new Customer(props);
  }

  static restore(props: Required<CustomerProps>) {
    const parsed = customerSchema.parse(props);
    return new Customer(parsed);
  }

  // public methods
  public toJSON() {
    return this.props;
  }

  // getters
  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get username() {
    return this.props.username;
  }
}
