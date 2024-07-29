"use server";

import { validateRequest } from "@/lib/validate-request";

export const getCurrentUser = async () => {
  const { user } = await validateRequest();

  return user;
};
