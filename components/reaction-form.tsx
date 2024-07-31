"use client";

import { toggleReaction } from "@/actions/toggle-reaction";
import { EMOJI } from "@/consts/emoji";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Smile } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { toast } from "sonner";

type Props = {
  commentId?: ID;
  messageId?: ID;
  postId?: ID;
};

export const ReactionForm = (props: Props) => {
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
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger className="text-muted-foreground/70 transition-colors hover:text-primary">
          <Smile />
        </TooltipTrigger>
        <TooltipContent className="rounded-full border p-1">
          {Object.values(EMOJI).map((emoji) => (
            <button
              key={emoji}
              className="rounded-full px-3 py-0.5 text-base transition-colors hover:bg-muted/50"
              onClick={() =>
                handleToggleReaction({
                  code: emoji,
                  ...props,
                })
              }
            >
              {emoji}
            </button>
          ))}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
