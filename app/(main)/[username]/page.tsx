import { PostForm } from "@/components/post-form";
import { PostList } from "@/components/post-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div>
      <h1 className="py-16 text-xl">Моя страница</h1>
      <div className="mb-16 flex justify-between">
        <div className="flex flex-col items-center justify-center gap-1">
          <Avatar className="size-32 text-xl">
            <AvatarImage src="" />
            <AvatarFallback>BS</AvatarFallback>
          </Avatar>
          <span>@bsafronov</span>
        </div>
        <div className="flex gap-2">
          <Button variant={"ghost"}>Написать</Button>
          <Button>Подписаться</Button>
        </div>
      </div>
      <div>
        <div className="flex gap-2">
          <PostForm />
        </div>
        <div className="mt-16">
          <PostList />
        </div>
      </div>
    </div>
  );
}
