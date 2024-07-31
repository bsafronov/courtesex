import { Navbar } from "@/components/navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="grow">
        <div className="mx-auto my-16 max-w-screen-lg">{children}</div>
      </div>
    </div>
  );
}
