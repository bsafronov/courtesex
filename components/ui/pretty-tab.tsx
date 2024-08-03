"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef } from "react";
import { motion } from "framer-motion";
type Props = ComponentPropsWithoutRef<typeof Link> & {
  exact?: boolean;
  classNameActive?: string;
  classNameActiveElement?: string;
  name: string;
};

export const PrettyTab = ({
  href,
  exact,
  className,
  classNameActive,
  classNameActiveElement,
  children,
  name,
  ...rest
}: Props) => {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.includes(href.toString());

  return (
    <Link
      href={href}
      className={cn("relative", className, active && classNameActive)}
      {...rest}
    >
      {children}
      {active && classNameActiveElement && (
        <motion.div
          layoutId={name}
          className={cn("absolute", classNameActiveElement)}
        />
      )}
    </Link>
  );
};
