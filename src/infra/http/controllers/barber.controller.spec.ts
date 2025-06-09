import { createTestApp } from "@/../tests/create-test-app";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Barber Controller", () => {
  // create barber
  it("should create valid barber and return status 201", async () => {
    const app = await createTestApp();

    const response = await request(app.server).post("/barber").send({
      name: "John Doe",
      username: "johndoe",
      workdays: [],
    });

    expect(response.statusCode).toBe(201);
  });

  it("should return status 409 if barber already exists", async () => {
    const app = await createTestApp();

    await request(app.server).post("/barber").send({
      name: "John Doe",
      username: "johndoe",
      workdays: [],
    });

    const conflictingRequest = await request(app.server).post("/barber").send({
      name: "John Doe 2",
      username: "johndoe",
      workdays: [],
    });

    expect(conflictingRequest.statusCode).toBe(409);
  });

  it("should return status 400 if request body is invalid", async () => {
    const app = await createTestApp();

    const response = await request(app.server).post("/barber").send({});

    console.log(response.text);

    expect(response.statusCode).toBe(400);
  });

  // get barber list
  it("should return status 200 and list of barbers", async () => {
    const app = await createTestApp();

    const response = await request(app.server).get("/barber");

    console.log(response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
