import { imagesTable, usersTable } from "@/schema";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getUsernameInitials } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { getRelativeDate } from "@/lib/date";

type Props = {
  user: typeof usersTable.$inferSelect & {
    avatar: typeof imagesTable.$inferSelect | null;
  };
};

export const UserCard = ({ user }: Props) => {
  const { username, avatar, createdAt } = user;

  return (
    <div className="flex justify-between rounded-md border p-4">
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src={avatar?.url} />
          <AvatarFallback>{getUsernameInitials(username)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <Link href={`/users/${username}`} className="text-sm hover:underline">
            @{username}
          </Link>
          <span className="text-xs text-muted-foreground">
            Зарегистрирован {getRelativeDate(createdAt)}
          </span>
        </div>
      </div>
      <div>
        <Button size={"icon"} variant={"ghost"}>
          <MoreHorizontal />
        </Button>
      </div>
    </div>
  );
};
