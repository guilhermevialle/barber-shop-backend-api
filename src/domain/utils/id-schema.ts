import { z } from "zod";
import { DEFAULT_SIZE } from "../services/id-generator.service";

export const idSchema = (type?: string) => {
  const _type = type ?? "";

  return z
    .string({
      required_error: `${_type}Id is required`,
      invalid_type_error: `${_type}Id must be a string`,
    })
    .length(DEFAULT_SIZE, `${_type}Id must be ${DEFAULT_SIZE} characters long`);
};
