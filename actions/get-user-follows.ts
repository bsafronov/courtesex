"use server";

import { db } from "@/lib/db";
import { followsTable, usersTable } from "@/schema";
import { eq } from "drizzle-orm";

export async function getUserFollows(username: string) {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.username, username),
  });

  if (!user) {
    throw new Error("User not found");
  }

  return await db.query.followsTable.findMany({
    where: eq(followsTable.sourceId, user.id),
    with: {
      targetUser: {
        with: {
          avatar: true,
        },
      },
    },
  });
}
