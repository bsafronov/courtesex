"use server";

import { validateRequest } from "@/lib/validate-request";

export const protectedAuth = async () => {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Not authenticated!");
  }
};
