import { Navbar } from "@/components/navbar";
import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="grow">
        <div className="mx-auto mb-16 max-w-screen-lg px-4">{children}</div>
      </div>
    </div>
  );
}
