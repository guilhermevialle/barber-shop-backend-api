import { createTestApp } from "@/main/helpers/create-test-app";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Customer Controller", () => {
  // create
  it("should create valid customer and return status 201", async () => {
    const app = await createTestApp();

    const response = await request(app.server).post("/customer").send({
      name: "John Doe",
      username: "johndoe",
      password: "password123",
    });

    expect(response.statusCode).toBe(201);
  });

  it("should return status 409 if customer already exists", async () => {
    const app = await createTestApp();

    await request(app.server).post("/customer").send({
      name: "John Doe",
      username: "johndoe",
      password: "password123",
    });

    const conflictingRequest = await request(app.server)
      .post("/customer")
      .send({
        name: "John Doe 2",
        username: "johndoe",
        password: "password123",
      });

    expect(conflictingRequest.statusCode).toBe(409);
  });

  it("should return status 400 if request body is invalid", async () => {
    const app = await createTestApp();

    const invalidRequest = await request(app.server).post("/customer").send({});

    expect(invalidRequest.statusCode).toBe(400);
  });
});
