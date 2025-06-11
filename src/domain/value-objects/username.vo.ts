import { usernameSchema } from "../types/value-object-types/username.types";

export class Username {
  private _value: string;

  constructor(username: string) {
    this._value = username;

    usernameSchema.parse(this._value);
  }

  // static methods
  static create(username: string): Username {
    return new Username(username);
  }

  // public methods
  public toString(): string {
    return this._value;
  }

  public equals(other: Username): boolean {
    return this.value === other.value;
  }

  // getters
  get value(): string {
    return this._value;
  }
}
