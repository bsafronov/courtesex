"use client";

import { MoreHorizontal, Trash } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/actions/delete-post";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getUserPosts } from "@/actions/get-user-posts";

type Props = {
  post: Return<typeof getUserPosts>[number];
};

export const PostMoreActions = ({ post }: Props) => {
  const user = useCurrentUser();
  const ctx = useQueryClient();
  const isOwner = user?.id === post.userId;

  const { mutate: handleDeletePost } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Пост удалён!");
      ctx.invalidateQueries({
        queryKey: ["posts", user?.username],
      });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isOwner && (
          <>
            <DropdownMenuItem
              className="gap-2 text-red-500 focus:text-red-500"
              onClick={() => handleDeletePost(post.id)}
            >
              <Trash className="size-4" /> Удалить
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
