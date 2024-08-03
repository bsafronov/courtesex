import { getUsers } from "@/actions/get-users";
import { Heading } from "@/components/ui/heading";
import { UserCard } from "@/components/user-card";

export default async function Page() {
  const users = await getUsers();

  return (
    <div>
      <Heading title="Поиск людей" />
      <div className="flex flex-col gap-2">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
