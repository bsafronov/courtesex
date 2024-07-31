"use client";

import { getUserPosts } from "@/actions/get-user-posts";
import { getRelativeDate } from "@/lib/date";
import { getUsernameInitials } from "@/lib/utils";
import { User } from "lucia";
import { PostMoreActions } from "./post-more-actions";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { ReactionList } from "./reaction-list";
import { Smile } from "lucide-react";
import { ReactionForm } from "./reaction-form";

type Props = {
  post: Return<typeof getUserPosts>[number];
};

export const Post = ({ post }: Props) => {
  const { content, createdAt, author } = post;

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
      <div className="flex items-center gap-2 p-6">
        <ReactionForm postId={post.id} />
        <ReactionList reactions={post.reactions} />
      </div>
    </Card>
  );
};
