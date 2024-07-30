"use server";

import { CreatePostSchema } from "@/schema/create-post";
import { protectedAuth } from "./protected-auth";

export const createPost = async ({ content }: CreatePostSchema) => {
  const user = await protectedAuth();
};
