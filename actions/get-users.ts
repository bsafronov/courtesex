"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "./get-current-user";
import { ne } from "drizzle-orm";
import { usersTable } from "@/schema";
export async function getUsers() {
  const user = await getCurrentUser();

  let condition;

  if (user) {
    condition = ne(usersTable.id, user.id);
  }

  return await db.query.usersTable.findMany({
    where: condition,
    with: {
      avatar: true,
    },
  });
}
