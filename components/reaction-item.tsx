"use client";

import { toggleReaction } from "@/actions/toggle-reaction";
import { cn } from "@/lib/utils";
import { reactionsTable } from "@/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
  reactions: (typeof reactionsTable.$inferSelect)[];
  emoji: string;
  hasUserReaction: boolean;
};

export const ReactionItem = ({ reactions, emoji, hasUserReaction }: Props) => {
  const ctx = useQueryClient();

  const { mutate: handleToggleReaction } = useMutation({
    mutationFn: toggleReaction,
    onSuccess: () => {
      toast("Реакция переключена");
      ctx.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  return (
    <button
      className={cn(
        "flex items-center gap-1 rounded-full bg-muted/40 px-3 py-0.5 text-muted-foreground transition-colors hover:bg-muted/60",
        hasUserReaction && "bg-muted/80 hover:bg-muted",
      )}
      onClick={() =>
        handleToggleReaction({
          code: emoji,
          commentId: reactions[0]?.commentId ?? undefined,
          messageId: reactions[0]?.messageId ?? undefined,
          postId: reactions[0]?.postId ?? undefined,
        })
      }
    >
      {reactions.length > 1 && (
        <span className="text-sm">{reactions.length}</span>
      )}
      {emoji}
    </button>
  );
};
