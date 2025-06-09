import request from "supertest";
import { describe, expect, it } from "vitest";
import { createTestApp } from "../../../../tests/create-test-app";

describe("Barber Controller", () => {
  it("should create valid barber", async () => {
    const app = await createTestApp();

    const response = await request(app.server).post("/barber").send({
      name: "John Doe",
      username: "johndoe",
      workdays: [],
    });

    console.log(response.body);
    expect(response.statusCode).toBe(201);
  });

  it("should throw if username already exists", async () => {
    const app = await createTestApp();

    await request(app.server).post("/barber").send({
      name: "John Doe",
      username: "johndoe",
      workdays: [],
    });

    await expect(() =>
      request(app.server).post("/barber").send({
        name: "John Doe",
        username: "johndoe",
        workdays: [],
      })
    ).rejects.toThrow();
  });
});
