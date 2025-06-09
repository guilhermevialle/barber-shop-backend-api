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

    expect(response.statusCode).toBe(201);
  });

  it("should return 400 if request body is invalid", async () => {
    const app = await createTestApp();

    const response = await request(app.server).post("/barber").send({});

    console.log(response.text);

    expect(response.statusCode).toBe(400);
  });

  it("should throw if username already exists", async () => {
    const app = await createTestApp();

    await request(app.server).post("/barber").send({
      name: "John Doe",
      username: "johndoe",
      workdays: [],
    });

    const conflictingRequest = await request(app.server).post("/barber").send({
      name: "John Doe",
      username: "johndoe",
      workdays: [],
    });

    expect(conflictingRequest.statusCode).toBe(409);
  });
});
