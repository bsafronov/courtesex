"use client";

import { getUserPosts } from "@/actions/get-user-posts";
import { getRelativeDate } from "@/lib/date";
import { cn, getUsernameInitials } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { PostMoreActions } from "./post-more-actions";
import { ReactionForm } from "./reaction-form";
import { ReactionList } from "./reaction-list";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { useState } from "react";
import { PostCommentList } from "./post-comment-list";

type Props = {
  post: Return<typeof getUserPosts>[number];
};

export const Post = ({ post }: Props) => {
  const { content, createdAt, author, comments } = post;
  const [commentsOpen, setCommentsOpen] = useState(false);

  return (
    <Card className="">
      <div className="flex items-center justify-between border-b p-6">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>
              {getUsernameInitials(author.username)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span>@{author.username}</span>
            <span className="text-xs text-muted-foreground">
              {getRelativeDate(createdAt)}
            </span>
          </div>
        </div>
        <PostMoreActions post={post} />
      </div>
      {content && (
        <div
          className="prose prose-zinc my-8 px-6 dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      <div className="flex items-center gap-2 px-6">
        <ReactionList reactions={post.reactions} />
      </div>
      <div className="flex gap-2 px-6 py-4">
        <ReactionForm postId={post.id} />

        <button
          className={cn(
            "flex items-center gap-1 rounded-full bg-muted/30 px-3 py-1 text-muted-foreground/50 transition-colors hover:bg-muted/50 hover:text-muted-foreground",
            commentsOpen && "bg-muted/70 text-muted-foreground/90",
          )}
          onClick={() => setCommentsOpen((prev) => !prev)}
        >
          {comments.length > 0 && (
            <span className="text-sm">{comments.length}</span>
          )}
          <MessageCircle className="size-5" />
        </button>
      </div>
      {commentsOpen && <PostCommentList postId={post.id} />}
    </Card>
  );
};
