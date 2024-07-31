"use server";

import { db } from "@/lib/db";
import { protectedAuth } from "./protected-auth";
import { eq } from "drizzle-orm";
import { postsTable } from "@/schema";

export async function deletePost(postId: ID) {
  const user = await protectedAuth();

  const post = await db.query.postsTable.findFirst({
    where: eq(postsTable.id, postId),
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.userId !== user.id) {
    throw new Error("You do not have permission to delete this post");
  }

  await db.delete(postsTable).where(eq(postsTable.id, postId));

  return post.id;
}
