import { getCurrentUser } from "@/actions/get-current-user";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen">
      {!user && (
        <Button variant={"ghost"} size={"icon"} className="fixed left-4 top-4">
          <Link href={"/auth/sign-in"}>
            <LogIn />
          </Link>
        </Button>
      )}
      <Navbar />
      <div className="grow">
        <div className="mx-auto my-16 max-w-screen-lg px-4">{children}</div>
      </div>
    </div>
  );
}
