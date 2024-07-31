import { ZOD_ID } from "@/consts/zod";
import { z } from "zod";

export const toggleReactionSchema = z.object({
  postId: ZOD_ID.optional(),
  commentId: ZOD_ID.optional(),
  messageId: ZOD_ID.optional(),
  code: z.string(),
});

export type ToggleReactionSchema = z.infer<typeof toggleReactionSchema>;
