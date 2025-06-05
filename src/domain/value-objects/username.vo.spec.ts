import { describe, expect, it } from "vitest";
import { Username } from "./username.vo";

describe("Username Value Object", () => {
  it("should create a valid username", () => {
    const username = Username.create("gui_dev");

    expect(username.value).toBe("gui_dev");
    expect(username.toString()).toBe("gui_dev");
  });

  it("should throw error if username is too short", () => {
    expect(() => Username.create("gu")).toThrow();
  });

  it("should throw error if username is too long", () => {
    expect(() => Username.create("a".repeat(21))).toThrow();
  });

  it("should throw error if username contains invalid characters", () => {
    expect(() => Username.create("gui@dev")).toThrow();
  });

  it("should compare equality correctly", () => {
    const a = Username.create("user_01");
    const b = Username.create("user_01");
    const c = Username.create("otherUser");

    expect(a.equals(b)).toBe(true);
    expect(a.equals(c)).toBe(false);
  });
});
