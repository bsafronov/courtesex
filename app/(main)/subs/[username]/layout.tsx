import { Heading } from "@/components/ui/heading";
import { PrettyTabs } from "@/components/ui/pretty-tabs";

type Props = {
  params: {
    username: string;
  };
  children: React.ReactNode;
};

export default async function Layout({
  params: { username },
  children,
}: Props) {
  return (
    <div>
      <Heading title="Подписки" />
      <PrettyTabs
        name="subs"
        items={[
          { href: `/subs/${username}/to`, children: "Подписки", exact: true },
          { href: `/subs/${username}`, children: "Подписчики", exact: true },
        ]}
      />
      {children}
    </div>
  );
}
