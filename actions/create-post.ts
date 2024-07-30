"use server";

import { CreatePostSchema } from "@/schema/create-post";
import { protectedAuth } from "./protected-auth";
import { db } from "@/lib/db";
import { postsTable } from "@/schema";

export const createPost = async ({ content }: CreatePostSchema) => {
  const user = await protectedAuth();

  const [newPost] = await db
    .insert(postsTable)
    .values({
      userId: user.id,
      content,
    })
    .returning();

  return newPost;
};
