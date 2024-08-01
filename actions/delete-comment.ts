"use server";

import { db } from "@/lib/db";
import { protectedAuth } from "./protected-auth";
import { eq } from "drizzle-orm";
import { commentsTable } from "@/schema";

export async function deleteComment(commentId: ID) {
  const user = await protectedAuth();

  const comment = await db.query.commentsTable.findFirst({
    where: eq(commentsTable.id, commentId),
  });

  if (!comment) {
    throw new Error("Комментарий не существует");
  }

  if (comment.userId !== user.id) {
    throw new Error("Вы не можете удалить этот комментарий");
  }

  await db.delete(commentsTable).where(eq(commentsTable.id, commentId));

  return comment.id;
}
