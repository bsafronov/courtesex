"use server";

import { db } from "@/lib/db";
import { reactionsTable } from "@/schema";
import { ToggleReactionSchema } from "@/schema/toggle-reaction";
import { and, asc, eq } from "drizzle-orm";
import { protectedAuth } from "./protected-auth";

export async function toggleReaction({
  code,
  commentId,
  messageId,
  postId,
}: ToggleReactionSchema) {
  const user = await protectedAuth();

  if (!postId && !commentId && !messageId) {
    throw new Error("Invalid request");
  }

  let condition;

  if (postId) {
    condition = eq(reactionsTable.postId, postId);
  } else if (commentId) {
    condition = eq(reactionsTable.commentId, commentId);
  } else if (messageId) {
    condition = eq(reactionsTable.messageId, messageId);
  }

  const reactions = await db.query.reactionsTable.findMany({
    where: and(condition, eq(reactionsTable.userId, user.id)),
    orderBy: asc(reactionsTable.createdAt),
  });

  const sameReaction = reactions.find((reaction) => reaction.code === code);

  if (sameReaction) {
    return await db
      .delete(reactionsTable)
      .where(eq(reactionsTable.id, sameReaction.id));
  }

  if (reactions.length > 3) {
    await db
      .delete(reactionsTable)
      .where(eq(reactionsTable.id, reactions[0].id));
  }

  await db.insert(reactionsTable).values({
    code,
    postId,
    userId: user.id,
  });
}
