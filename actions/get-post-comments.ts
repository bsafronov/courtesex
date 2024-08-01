"use server";

import { db } from "@/lib/db";
import { commentsTable } from "@/schema";
import { asc, eq } from "drizzle-orm";

export async function getPostComments(postId: ID) {
  return db.query.commentsTable.findMany({
    where: eq(commentsTable.postId, postId),
    orderBy: asc(commentsTable.createdAt),
    with: {
      audios: true,
      author: {
        with: {
          avatar: true,
        },
      },
      images: true,
      videos: true,
      reactions: true,
    },
  });
}
