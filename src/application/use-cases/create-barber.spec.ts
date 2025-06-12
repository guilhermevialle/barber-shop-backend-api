import {
  DependenciesFactory,
  IDependenciesFactory,
} from "@/main/helpers/dependecies-factory";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateBarber } from "./create-barber";

describe("Create Barber Use Case", () => {
  let useCase: CreateBarber;
  let deps: IDependenciesFactory;
  let repos: IDependenciesFactory["repos"];
  let services: IDependenciesFactory["services"];

  beforeEach(() => {
    deps = DependenciesFactory();
    repos = deps.repos;
    services = deps.services;
    useCase = new CreateBarber(repos.barberRepo);
  });

  it("should create valid barber with empty or filled workdays", async () => {
    await expect(() =>
      useCase.execute({
        name: "John Doe",
        username: "johndoe2",
        password: "password123",
        workdays: [],
      })
    ).not.toThrow();

    await expect(() =>
      useCase.execute({
        name: "John Doe",
        username: "johndoe",
        password: "password123",
        workdays: [
          {
            weekday: 1,
            shifts: [
              {
                startTime: "08:00",
                endTime: "12:00",
              },
            ],
          },
        ],
      })
    ).not.toThrow();
  });

  it("should throw if barber already exists", async () => {
    await useCase.execute({
      name: "John Doe",
      username: "johndoe",
      password: "password123",
      workdays: [],
    });

    await expect(() =>
      useCase.execute({
        name: "John Doe",
        username: "johndoe",
        password: "password123",
        workdays: [],
      })
    ).rejects.toThrow();
  });
});
