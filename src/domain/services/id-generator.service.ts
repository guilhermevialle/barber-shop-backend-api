import { IIdGeneratorService } from "@/interfaces/services/id-generator-service.interface";
import { nanoid } from "nanoid";

export class IdGeneratorService implements IIdGeneratorService {
  generate(size: number): string {
    return nanoid(size);
  }

  generateDefault(): string {
    return nanoid(21);
  }

  generateWithPrefix(prefix: string, size: number): string {
    return `${prefix}-${nanoid(size)}`;
  }

  isDefaultValid(id: string): boolean {
    if (!id) return false;
    if (id.includes("-")) return false;
    if (id.length !== 21) return false;
    if (typeof id !== "string") return false;

    return true;
  }
}

export const idGeneratorService = new IdGeneratorService();
