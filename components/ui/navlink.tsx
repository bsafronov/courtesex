"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<typeof Link> & {
  activeClassName?: string;
  exact?: boolean;
};

export const Navlink = ({
  activeClassName,
  className,
  href,
  exact,
  ...rest
}: Props) => {
  const pathname = usePathname();
  const condition = exact
    ? pathname === href
    : pathname.startsWith(href.toString());
  console.log(pathname, href.toString());

  return (
    <Link
      href={href}
      className={cn(className, condition && activeClassName)}
      {...rest}
    />
  );
};
