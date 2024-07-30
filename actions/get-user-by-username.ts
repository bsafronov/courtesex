"use server";

import { db } from "@/lib/db";
import { usersTable } from "@/schema";
import { eq } from "drizzle-orm";

export async function getUserByUsername(username: string) {
  return db.query.usersTable.findFirst({
    where: eq(usersTable.username, username),
  });
}
