import { getCurrentUser } from "@/actions/get-current-user";
import { NavbarLink } from "./navbar-link";
import { ThemeSwitcher } from "./theme-switcher";

export const Navbar = async () => {
  const user = await getCurrentUser();

  if (!user) return null;

  const { username } = user;
  return (
    <div className="fixed bottom-0 left-4 top-0 mt-4 flex w-60 flex-col justify-between border-r border-muted/30 bg-muted/10 p-4">
      <div>
        <div className="mb-8 flex w-min flex-col">
          <span className="animate-background-pan bg-gradient-to-r from-sky-600 via-amber-600 via-pink-600 to-sky-600 bg-[size:200%] bg-clip-text text-2xl font-extrabold leading-none text-transparent">
            Courtesex
          </span>
          <span className="self-end text-xs text-muted-foreground">
            by bsafronov
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <NavbarLink href={`/${username}`}>Главная</NavbarLink>
          <NavbarLink href={`/${username}/follows`}>Подписки</NavbarLink>
          <NavbarLink href={`/messages`}>Сообщения</NavbarLink>
          <NavbarLink href={`/${username}/images`}>Фотографии</NavbarLink>
          <NavbarLink href={`/${username}/music`}>Музыка</NavbarLink>
          <NavbarLink href={`/${username}/videos`}>Видео</NavbarLink>
          <NavbarLink href={`/settings`}>Настройки</NavbarLink>
        </div>
      </div>

      <div>
        <ThemeSwitcher />
      </div>
    </div>
  );
};
