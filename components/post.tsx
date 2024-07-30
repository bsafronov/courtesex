import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { getUserPosts } from "@/actions/get-user-posts";
import { getRelativeDate } from "@/lib/date";
import { getUsernameInitials } from "@/lib/utils";

type Props = {
  post: Return<typeof getUserPosts>[number];
  username: string;
};

export const Post = ({ post, username }: Props) => {
  const { content, createdAt } = post;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>{getUsernameInitials(username)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span>@{username}</span>
            <span className="text-xs text-muted-foreground">
              {getRelativeDate(createdAt)}
            </span>
          </div>
        </div>
        <Button size={"icon"} variant={"ghost"}>
          <MoreHorizontal />
        </Button>
      </div>
      {content && (
        <div
          className="prose prose-zinc my-8 dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </Card>
  );
};
