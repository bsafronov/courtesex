"use client";

import { reactionsTable } from "@/schema";
import { ReactionItem } from "./reaction-item";
import { useMemo } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";

type Props = {
  reactions: (typeof reactionsTable.$inferSelect)[];
};

type ReactionsByCodeValue = {
  reactions: (typeof reactionsTable.$inferSelect)[];
  hasUserReaction: boolean;
};

export const ReactionList = ({ reactions }: Props) => {
  const currentUser = useCurrentUser();

  const reactionsByCode = useMemo(() => {
    const reactionsByCode: Record<string, ReactionsByCodeValue> = {};

    reactions.forEach((reaction) => {
      const hasUserReaction = reaction.userId === currentUser?.id;
      if (reactionsByCode[reaction.code]) {
        reactionsByCode[reaction.code].reactions.push(reaction);

        if (hasUserReaction) {
          reactionsByCode[reaction.code].hasUserReaction = true;
        }
      }

      if (!reactionsByCode[reaction.code]) {
        reactionsByCode[reaction.code] = {
          reactions: [reaction],
          hasUserReaction,
        };
      }
    });

    return reactionsByCode;
  }, [currentUser, reactions]);

  return (
    <div className="flex flex-wrap gap-1">
      {Object.entries(reactionsByCode).map(
        ([code, { hasUserReaction, reactions }]) => (
          <ReactionItem
            key={code}
            emoji={code}
            reactions={reactions}
            hasUserReaction={hasUserReaction}
          />
        ),
      )}
    </div>
  );
};
