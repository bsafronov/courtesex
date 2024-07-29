import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      {children}
    </div>
  );
}
