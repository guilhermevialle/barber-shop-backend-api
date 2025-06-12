import { DateFactory } from "@/domain/helpers/date-factory";
import { barberTester } from "@/infra/repositories/in-memory/in-memory-barber.repository";
import { customerTester } from "@/infra/repositories/in-memory/in-memory-customer.repository";
import {
  serviceTester,
  serviceTester2,
} from "@/infra/repositories/in-memory/in-memory-service.repository";
import {
  DependenciesFactory,
  IDependenciesFactory,
} from "@/main/helpers/dependecies-factory";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateAppointment } from "./create-appointment";

describe("CreateAppointment Use Case", () => {
  let useCase: CreateAppointment;
  let deps: IDependenciesFactory;
  let repos: IDependenciesFactory["repos"];
  let services: IDependenciesFactory["services"];

  beforeEach(() => {
    deps = DependenciesFactory();
    repos = deps.repos;
    services = deps.services;
    useCase = new CreateAppointment(
      repos.barberRepo,
      repos.customerRepo,
      repos.serviceRepo,
      repos.appointmentRepo,
      services.barberAvailabilityService
    );
  });

  it("should create a new appointment when all inputs are valid and barber is available", async () => {
    await useCase.execute({
      barberId: barberTester.id,
      customerId: customerTester.id,
      serviceId: serviceTester2.id,
      startAt: DateFactory.hour(8)
        .minute(0)
        .day(new Date().getDate() + 1)
        .build(new Date()),
    });

    await expect(() =>
      useCase.execute({
        barberId: barberTester.id,
        customerId: customerTester.id,
        serviceId: serviceTester.id,
        startAt: DateFactory.hour(8)
          .minute(45)
          .day(new Date().getDate() + 1)
          .build(new Date()),
      })
    ).not.toThrow();
  });

  it("should throw if barber is not available", async () => {
    await expect(() =>
      useCase.execute({
        barberId: barberTester.id,
        customerId: customerTester.id,
        serviceId: serviceTester.id,
        // barber is not working at 01:00
        startAt: DateFactory.hour(1)
          .minute(0)
          .day(new Date().getDate() + 1)
          .build(new Date()),
      })
    ).rejects.toThrow();
  });

  it("should throw if barber, customer or service are not found", async () => {
    await expect(() =>
      useCase.execute({
        barberId: "invalid-barber-id",
        customerId: "invalid-customer-id",
        serviceId: "invalid-service-id",
        startAt: DateFactory.hour(8)
          .minute(0)
          .day(new Date().getDate() + 1)
          .build(new Date()),
      })
    ).rejects.toThrow();
  });
});
