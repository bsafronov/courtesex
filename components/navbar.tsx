import { getCurrentUser } from "@/actions/get-current-user";
import { ThemeSwitcher } from "./theme-switcher";
import { SignOutButton } from "./sign-out-button";
import {
  MessageCircle,
  Settings,
  User2,
  UserRoundCheck,
  Users2,
} from "lucide-react";
import { PrettyTab } from "./ui/pretty-tab";

export const Navbar = async () => {
  const user = await getCurrentUser();

  if (!user) return null;

  const { username } = user;
  return (
    <div className="border border-r bg-muted/10">
      <div className="sticky top-0">
        <div className="flex w-min flex-col p-4">
          <span className="animate-background-pan bg-gradient-to-r from-sky-600 via-amber-600 via-pink-600 to-sky-600 bg-[size:200%] bg-clip-text text-2xl font-extrabold leading-none text-transparent">
            Courtesex
          </span>
          <span className="self-end text-xs text-muted-foreground">
            by bsafronov
          </span>
        </div>
        <div className="flex flex-col gap-1 border-b p-4">
          <NavbarLink href={`/users/${username}`} exact>
            <User2 className="size-4" />
            Главная
          </NavbarLink>
          <NavbarLink href={`/subs/${username}`}>
            <UserRoundCheck className="size-4" />
            Подписки
          </NavbarLink>
          <NavbarLink href={`/users`} exact>
            <Users2 className="size-4" />
            Поиск людей
          </NavbarLink>
          <NavbarLink href={`/chats`} exact>
            <MessageCircle className="size-4" />
            Сообщения
          </NavbarLink>
          <NavbarLink href={`/settings`} exact>
            <Settings className="size-4" />
            Настройки
          </NavbarLink>
        </div>
        <div className="flex flex-col gap-1 p-4">
          <ThemeSwitcher />
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};

type NavbarLinkProps = {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
};

const NavbarLink = ({ children, href, exact }: NavbarLinkProps) => {
  return (
    <PrettyTab
      exact={exact}
      href={href}
      name="navbar-link"
      className="relative flex items-center gap-2 rounded-md border border-transparent px-3 py-1 text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-primary"
      classNameActive="text-primary"
      classNameActiveElement="-left-2 bottom-2 top-2 w-[2px] rounded-full bg-amber-500"
    >
      {children}
    </PrettyTab>
  );
};
