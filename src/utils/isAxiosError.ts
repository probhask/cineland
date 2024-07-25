import { isAxiosError } from "axios";

export const isInstanceAxiosError = (error: unknown, errMsg?: string) => {
  if (isAxiosError(error)) {
    return error.message;
  }
  return errMsg ? errMsg : "error";
};
