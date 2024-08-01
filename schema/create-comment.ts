import { ZOD_ID } from "@/consts/zod";
import { z } from "zod";

export const createCommentSchema = z.object({
  postId: ZOD_ID,
  content: z.string(),
});

export type CreateCommentSchema = z.infer<typeof createCommentSchema>;
