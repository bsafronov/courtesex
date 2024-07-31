"use server";

import { db } from "@/lib/db";
import { postsTable, usersTable } from "@/schema";
import { eq } from "drizzle-orm";

export async function getUserPosts(username: string) {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.username, username),
  });

  if (!user) {
    throw new Error("User not found");
  }

  return await db.query.postsTable.findMany({
    where: eq(postsTable.userId, user.id),
    limit: 20,
    with: {
      author: true,
      images: true,
      videos: true,
      reactions: true,
    },
  });
}
