import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";
import { __prod__ } from "../constants";

// debugging queries for the playground - never exposed in production
export const devOnly: MiddlewareFn<MyContext> = (_, next) => {
  if (__prod__) throw new Error("Not available in production");

  return next();
};
