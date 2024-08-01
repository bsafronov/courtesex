"use client";

import { getPostComments } from "@/actions/get-post-comments";
import { useQuery } from "@tanstack/react-query";
import { PostCommentItem } from "./post-comment-item";
import { Loader2 } from "lucide-react";
import { CommentForm } from "./comment-form";

type Props = {
  postId: ID;
};

export const PostCommentList = ({ postId }: Props) => {
  const { data: comments } = useQuery({
    queryKey: ["post-comments", postId],
    queryFn: () => getPostComments(postId),
  });

  if (!comments) {
    return (
      <div className="flex p-4">
        <Loader2 className="animate-spin text-sky-500" />
      </div>
    );
  }

  return (
    <div className="border-t">
      {!!!comments.length && <div className="p-6">Комментарии отсутствуют</div>}
      <div>
        {comments?.map((comment) => (
          <PostCommentItem key={comment.id} comment={comment} />
        ))}
      </div>
      <div className="p-2">
        <CommentForm postId={postId} />
      </div>
    </div>
  );
};
