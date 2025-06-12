import { barberTester } from "@/infra/repositories/in-memory/in-memory-barber.repository";
import {
  DependenciesFactory,
  IDependenciesFactory,
} from "@/main/helpers/dependecies-factory";
import { beforeEach, describe, expect, it } from "vitest";
import { ListBarberAppointments } from "./list-barber-appointments";

describe("ListBarberAppointments Use Case", () => {
  let useCase: ListBarberAppointments;
  let deps: IDependenciesFactory;
  let repos: IDependenciesFactory["repos"];
  let services: IDependenciesFactory["services"];

  beforeEach(() => {
    deps = DependenciesFactory();
    repos = deps.repos;
    services = deps.services;
    useCase = new ListBarberAppointments(
      repos.barberRepo,
      repos.appointmentRepo
    );
  });

  it("should list barber appointments when barber exists", async () => {
    const apps = await useCase.execute({ id: barberTester.id });
    expect(apps).toHaveLength(0);
  });

  it("should throw error when barber not found", async () => {
    await expect(() => useCase.execute({ id: "123" })).rejects.toThrow();
  });
});
