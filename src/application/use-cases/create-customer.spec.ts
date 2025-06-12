import {
  DependenciesFactory,
  IDependenciesFactory,
} from "@/main/helpers/dependecies-factory";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateCustomer } from "./create-customer";

describe("CreateCustomer Use Case", () => {
  let useCase: CreateCustomer;
  let deps: IDependenciesFactory;
  let repos: IDependenciesFactory["repos"];
  let services: IDependenciesFactory["services"];

  beforeEach(() => {
    deps = DependenciesFactory();
    repos = deps.repos;
    services = deps.services;
    useCase = new CreateCustomer(repos.customerRepo);
  });

  it("should create valid customer", async () => {
    await expect(() =>
      useCase.execute({
        username: "johndoe",
        name: "John Doe",
        password: "password123",
      })
    ).not.toThrow();
  });

  it("should throw if customer already exists", async () => {
    await useCase.execute({
      username: "johndoe",
      name: "John Doe",
      password: "password123",
    });

    await expect(() =>
      useCase.execute({
        username: "johndoe",
        name: "John Doe",
        password: "password123",
      })
    ).rejects.toThrow();
  });
});
