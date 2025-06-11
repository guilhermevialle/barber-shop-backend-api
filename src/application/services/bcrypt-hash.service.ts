import bcrypt from "bcrypt";
import {
  HashService,
  HashServiceInput,
  HashServiceOptions,
} from "../interfaces/services/hash-service.interface";

export class BcryptHashService extends HashService {
  protected options: HashServiceOptions = {
    saltRounds: 10,
  };

  constructor(options?: HashServiceOptions) {
    super();
    if (options) this.options = options;
  }

  private isBuffer(value: HashServiceInput) {
    return Buffer.isBuffer(value);
  }

  async hash(value: HashServiceInput): Promise<string> {
    const _value = this.isBuffer(value) ? value.toString("utf-8") : value;
    return bcrypt.hash(_value, this.options.saltRounds);
  }

  async compare(
    value: HashServiceInput,
    hash: HashServiceInput
  ): Promise<boolean> {
    const _value = this.isBuffer(value) ? value.toString("utf-8") : value;
    const _hash = this.isBuffer(hash) ? hash.toString("utf-8") : hash;
    return bcrypt.compare(_value, _hash);
  }
}
