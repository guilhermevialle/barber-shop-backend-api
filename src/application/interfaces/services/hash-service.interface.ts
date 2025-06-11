export interface HashServiceOptions {
  saltRounds: number;
}

export type HashServiceInput = string | Buffer;

export interface IHashService {
  hash(value: HashServiceInput): Promise<string>;
  compare(value: HashServiceInput, hash: HashServiceInput): Promise<boolean>;
}

export abstract class HashService implements IHashService {
  protected abstract readonly options: HashServiceOptions;

  abstract hash(value: HashServiceInput): Promise<string>;
  abstract compare(
    value: HashServiceInput,
    hash: HashServiceInput
  ): Promise<boolean>;
}
