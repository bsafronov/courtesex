"use server";

import { db } from "@/lib/db";
import { usersTable } from "@/schema";
import { SignUpSchema } from "@/schema/sign-up";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export const signUp = async ({ password, username }: SignUpSchema) => {
  const existingUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.username, username),
  });

  if (existingUser) {
    throw new Error("Пользователь с таким именем уже существует");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const [newUser] = await db
    .insert(usersTable)
    .values({
      username,
      hashPassword,
    })
    .returning();

  const session = await lucia.createSession(newUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};
