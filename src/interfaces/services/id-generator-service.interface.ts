export interface IIdGeneratorService {
  generate(size: number): string;
  generateWithPrefix(prefix: string, size: number): string;
  generateDefault(): string;
  isDefaultValid(id: string): boolean;
}
