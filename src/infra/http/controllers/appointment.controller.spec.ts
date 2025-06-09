import { createTestApp } from "@/../tests/create-test-app";
import { DateFactory } from "@/domain/helpers/date-factory";
import { barberTester } from "@/infra/repositories/in-memory/in-memory-barber.repository";
import { customerTester } from "@/infra/repositories/in-memory/in-memory-customer.repository";
import { serviceTester } from "@/infra/repositories/in-memory/in-memory-service.repository";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Appointment Controller", () => {
  // create
  it("should create valid appointment and return status 201", async () => {
    const app = await createTestApp();

    const response = await request(app.server)
      .post("/appointment")
      .send({
        barberId: barberTester.id,
        customerId: customerTester.id,
        serviceId: serviceTester.id,
        startAt: DateFactory.hour(8)
          .minute(30)
          .day(new Date().getDate() + 1)
          .build(),
      });

    expect(response.statusCode).toBe(201);
  });

  it("should return status 409 if has conflicting appointment", async () => {
    const app = await createTestApp();

    await request(app.server)
      .post("/appointment")
      .send({
        barberId: barberTester.id,
        customerId: customerTester.id,
        serviceId: serviceTester.id,
        startAt: DateFactory.hour(8)
          .minute(30)
          .day(new Date().getDate() + 1)
          .build(),
      });

    const response = await request(app.server)
      .post("/appointment")
      .send({
        barberId: barberTester.id,
        customerId: customerTester.id,
        serviceId: serviceTester.id,
        startAt: DateFactory.hour(8)
          .minute(30)
          .day(new Date().getDate() + 1)
          .build(),
      });

    expect(response.statusCode).toBe(409);
  });

  it("should return status 400 if request body is invalid", async () => {
    const app = await createTestApp();

    const response = await request(app.server).post("/appointment").send({});

    expect(response.statusCode).toBe(400);
  });
});
