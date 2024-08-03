import { getCurrentUser } from "@/actions/get-current-user";
import { getUserByUsername } from "@/actions/get-user-by-username";
import { PostForm } from "@/components/post-form";
import { PostList } from "@/components/post-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { notFound } from "next/navigation";

type Props = {
  params: {
    username: string;
  };
};

export default async function Page({ params }: Props) {
  const { username } = params;

  const user = await getUserByUsername(username);
  const myUser = await getCurrentUser();
  const isMyProfile = myUser?.username === username;

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <Heading
        title={`${isMyProfile ? "Моя страница" : `Страница ${username}`}`}
      />
      <div className="mb-16 flex justify-between">
        <div className="flex flex-col items-center justify-center gap-1">
          <Avatar className="size-32 text-xl">
            <AvatarImage src="" />
            <AvatarFallback>BS</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">@bsafronov</span>
        </div>
        <div className="flex gap-2">
          <Button variant={"ghost"}>Написать</Button>
          <Button>Подписаться</Button>
        </div>
      </div>
      <div>
        <div className="flex gap-2">
          <PostForm username={username} />
        </div>
        <div className="mt-16">
          <PostList username={username} />
        </div>
      </div>
    </div>
  );
}
