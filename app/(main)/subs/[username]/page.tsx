import { getUserFollows } from "@/actions/get-user-follows";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUsernameInitials } from "@/lib/utils";
import Link from "next/link";

type Props = {
  params: {
    username: string;
  };
};

export default async function Page({ params: { username } }: Props) {
  const followedUsers = await getUserFollows(username);

  if (followedUsers.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <p className="mb-16 text-muted-foreground">Подписчики отсутствуют</p>
        <Button asChild className="w-min">
          <Link href={"/users"}>Найти людей</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {followedUsers.map(({ targetUser: { id, avatar, username } }) => (
        <div key={id} className="flex">
          <Avatar>
            <AvatarImage src={avatar?.url} />
            <AvatarFallback>{getUsernameInitials(username)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm">@{username}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
