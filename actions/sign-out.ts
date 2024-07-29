"use server";

import { lucia } from "@/lib/auth";
import { validateRequest } from "@/lib/validate-request";
import { cookies } from "next/headers";

export const signOut = async () => {
  const { session } = await validateRequest();

  if (!session) {
    throw new Error("Не авторизован");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};
