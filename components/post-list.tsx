"use client";

import { getUserPosts } from "@/actions/get-user-posts";
import { useQuery } from "@tanstack/react-query";
import { Post } from "./post";

type Props = {
  username: string;
};

export const PostList = ({ username }: Props) => {
  const { data: posts } = useQuery({
    queryKey: ["posts", username],
    queryFn: () => getUserPosts(username),
  });

  return (
    <div className="flex flex-col gap-2">
      {posts?.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};
