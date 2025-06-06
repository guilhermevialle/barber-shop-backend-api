import { IdGeneratorService } from "@/domain/services/id-generator.service";
import { describe, expect, it } from "vitest";

describe("IdGenerator Service", () => {
  const service = new IdGeneratorService();

  describe("generate", () => {
    it("should generate an ID with the specified size", () => {
      const id = service.generate(10);
      expect(typeof id).toBe("string");
      expect(id.length).toBe(10);
    });
  });

  describe("generateDefault", () => {
    it("should generate a default ID with 21 characters", () => {
      const id = service.generateDefault();
      expect(typeof id).toBe("string");
      expect(id.length).toBe(21);
    });
  });

  describe("generateWithPrefix", () => {
    it("should generate an ID with the given prefix and size", () => {
      const id = service.generateWithPrefix("user", 10);
      expect(id.startsWith("user-")).toBe(true);
      expect(id.length).toBeGreaterThan(10); // "user-" adds 5 chars
    });
  });

  describe("isDefaultValid", () => {
    it("should return true for valid default ID", () => {
      const id = service.generateDefault();
      expect(service.isDefaultValid(id)).toBe(true);
    });

    it("should return false for ID with dash", () => {
      const id = service.generateWithPrefix("prefix", 16);
      expect(service.isDefaultValid(id)).toBe(false);
    });

    it("should return false for non-string input", () => {
      expect(service.isDefaultValid(null as any)).toBe(false);
      expect(service.isDefaultValid(undefined as any)).toBe(false);
    });

    it("should return false for wrong length", () => {
      const id = service.generate(10);
      expect(service.isDefaultValid(id)).toBe(false);
    });
  });
});
