import { barberTester } from "@/infra/repositories/in-memory/in-memory-barber.repository";
import {
  DependenciesFactory,
  IDependenciesFactory,
} from "@/main/helpers/dependecies-factory";
import { beforeEach, describe, expect, it } from "vitest";
import { FindBarberAvailability } from "./find-barber-availability";

describe("FindBarberAvailability Use Case", () => {
  let useCase: FindBarberAvailability;
  let deps: IDependenciesFactory;
  let repos: IDependenciesFactory["repos"];
  let services: IDependenciesFactory["services"];

  beforeEach(() => {
    deps = DependenciesFactory();
    repos = deps.repos;
    services = deps.services;
    useCase = new FindBarberAvailability(
      repos.barberRepo,
      services.barberAvailabilityService
    );
  });

  it("should find barber availability by date", async () => {
    const slots = await useCase.execute({
      id: barberTester.id,
      date: new Date(),
    });

    expect(slots).toBeInstanceOf(Array);
  });

  it("should throw if barber is not found", async () => {
    await expect(() =>
      useCase.execute({ id: "invalid-id", date: new Date() })
    ).rejects.toThrow();
  });
});
