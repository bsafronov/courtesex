import { z } from "zod";

export const createPostSchema = z.object({
  content: z.string(),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
