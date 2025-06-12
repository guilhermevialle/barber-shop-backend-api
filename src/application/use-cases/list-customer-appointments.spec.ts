import { customerTester } from "@/infra/repositories/in-memory/in-memory-customer.repository";
import {
  DependenciesFactory,
  IDependenciesFactory,
} from "@/main/helpers/dependecies-factory";
import { beforeEach, describe, expect, it } from "vitest";
import { ListCustomerAppointments } from "./list-customer-appointments";

describe("ListCustomerAppointments Use Case", () => {
  let useCase: ListCustomerAppointments;
  let deps: IDependenciesFactory;
  let repos: IDependenciesFactory["repos"];
  let services: IDependenciesFactory["services"];

  beforeEach(() => {
    deps = DependenciesFactory();
    repos = deps.repos;
    services = deps.services;
    useCase = new ListCustomerAppointments(
      repos.customerRepo,
      repos.appointmentRepo
    );
  });

  it("should list customer appointments when customer exists", async () => {
    const apps = await useCase.execute({ id: customerTester.id });
    expect(apps).toHaveLength(0);
  });

  it("should throw error when customer not found", async () => {
    await expect(() => useCase.execute({ id: "123" })).rejects.toThrow();
  });
});
