import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

export const Navbar = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 w-60 p-4 flex flex-col justify-between">
      <div className="flex flex-col">
        <Link href={"/"}>Главная</Link>
        <Link href={"/messages"}>Сообщения</Link>
      </div>
      <div>
        <ThemeSwitcher />
      </div>
    </div>
  );
};
