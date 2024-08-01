"use client";

import { getPostComments } from "@/actions/get-post-comments";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getUsernameInitials } from "@/lib/utils";
import { getRelativeDate } from "@/lib/date";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "@/actions/delete-comment";
import { toast } from "sonner";

type Props = {
  comment: Return<typeof getPostComments>[number];
};

export const PostCommentItem = ({ comment }: Props) => {
  const { content, createdAt, updatedAt, author } = comment;

  const isEdited = createdAt.toISOString() !== updatedAt.toISOString();

  const ctx = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: async () => {
      await ctx.invalidateQueries({
        queryKey: ["post-comments", comment.postId],
      });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return (
    <div className="group flex items-end justify-between p-4 hover:bg-muted/10">
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src={author.avatar?.url} />
          <AvatarFallback>
            {getUsernameInitials(author.username)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div>
            <span className="text-sm text-muted-foreground">
              @{author.username}
            </span>
            {content && (
              <div
                dangerouslySetInnerHTML={{ __html: content }}
                className="prose prose-zinc text-sm dark:prose-invert"
              />
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">
              {getRelativeDate(createdAt)}
            </span>
            {isEdited && (
              <span>
                (изменено
                {getRelativeDate(updatedAt)})
              </span>
            )}
          </div>
          <div></div>
        </div>
      </div>
      <div>
        <button
          className="text-muted-foreground/50 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"
          onClick={() => mutate(comment.id)}
        >
          <Trash className="size-4" />
        </button>
      </div>
    </div>
  );
};
