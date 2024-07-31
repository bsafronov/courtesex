import { getCurrentUser } from "@/actions/get-current-user";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser();

  if (user) {
    return redirect(`/${user.username}`);
  }

  return null;
}
