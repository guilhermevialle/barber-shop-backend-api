import { describe, expect, it } from "vitest";
import { BcryptHashService } from "./bcrypt-hash.service";

const service = new BcryptHashService({ saltRounds: 6 });

describe("BcryptHash Service", () => {
  const raw = "my_secret";
  const buffer = Buffer.from(raw);

  describe("hash", () => {
    it("should hash a plain string", async () => {
      const hash = await service.hash(raw);
      expect(typeof hash).toBe("string");
      expect(hash).not.toBe(raw);
    });

    it("should hash a buffer", async () => {
      const hash = await service.hash(buffer);
      expect(typeof hash).toBe("string");
      expect(hash).not.toBe(raw);
    });

    it("should generate different hashes for same input", async () => {
      const hash1 = await service.hash(raw);
      const hash2 = await service.hash(raw);
      expect(hash1).not.toBe(hash2);
    });
  });

  describe("compare", () => {
    it("should return true for correct string/hash", async () => {
      const hash = await service.hash(raw);
      expect(await service.compare(raw, hash)).toBe(true);
    });

    it("should return true for correct buffer/hash", async () => {
      const hash = await service.hash(buffer);
      expect(await service.compare(buffer, hash)).toBe(true);
    });

    it("should return false for incorrect value", async () => {
      const hash = await service.hash(raw);
      expect(await service.compare("wrong", hash)).toBe(false);
    });

    it("should return false for tampered hash", async () => {
      const hash = await service.hash(raw);
      const tampered = hash.slice(0, -1) + "x";
      expect(await service.compare(raw, tampered)).toBe(false);
    });

    it("should allow comparing Buffer with string hash", async () => {
      const hash = await service.hash(buffer);
      expect(await service.compare(raw, hash)).toBe(true);
    });
  });
});
