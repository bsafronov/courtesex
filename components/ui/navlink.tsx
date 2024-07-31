"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<typeof Link> & {
  activeClassName?: string;
};

export const Navlink = ({
  activeClassName,
  className,
  href,
  ...rest
}: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(className, pathname === href && activeClassName)}
      {...rest}
    />
  );
};
