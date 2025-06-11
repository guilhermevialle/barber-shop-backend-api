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

  /**
   * Hashes a given value using bcrypt with the specified salt rounds.
   *
   * If the value is a Buffer, it is converted to a UTF-8 string before hashing.
   * @param {HashServiceInput} value The value to hash. Can be a string or a Buffer.
   * @returns {Promise<string>} The generated hash.
   */
  async hash(value: HashServiceInput): Promise<string> {
    const _value = this.isBuffer(value) ? value.toString("utf-8") : value;
    return bcrypt.hash(_value, this.options.saltRounds);
  }

  /**
   * Compares a given value with a hash to determine if they match.
   *
   * If the input value or hash is a Buffer, it is converted to a UTF-8 string
   * before comparison.
   *
   * @param {HashServiceInput} value - The original value to compare. Can be a string or a Buffer.
   * @param {HashServiceInput} hash - The hash to compare against. Can be a string or a Buffer.
   * @returns {Promise<boolean>} True if the value matches the hash; otherwise, false.
   */
  async compare(
    value: HashServiceInput,
    hash: HashServiceInput
  ): Promise<boolean> {
    const _value = this.isBuffer(value) ? value.toString("utf-8") : value;
    const _hash = this.isBuffer(hash) ? hash.toString("utf-8") : hash;
    return bcrypt.compare(_value, _hash);
  }
}
