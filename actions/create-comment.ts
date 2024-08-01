"use server";

import { CreateCommentSchema } from "@/schema/create-comment";
import { protectedAuth } from "./protected-auth";
import { db } from "@/lib/db";
import { commentsTable } from "@/schema";

export async function createComment({ postId, content }: CreateCommentSchema) {
  const user = await protectedAuth();

  const [newComment] = await db
    .insert(commentsTable)
    .values({
      userId: user.id,
      postId,
      content,
    })
    .returning();

  return newComment;
}
