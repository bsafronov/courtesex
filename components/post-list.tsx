import { Post } from "./post";

type Props = {};

export const PostList = () => {
  return (
    <div className="flex flex-col gap-2">
      <Post />
      <Post />
      <Post />
    </div>
  );
};
