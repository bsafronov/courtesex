"use client";

import { cn } from "@/lib/utils";
import { Navlink } from "./ui/navlink";
import { ComponentPropsWithoutRef } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type Props = ComponentPropsWithoutRef<typeof Navlink>;
export const NavbarLink = ({ className, children, ...props }: Props) => {
  const pathname = usePathname();
  const active = pathname === props.href;

  return (
    <Navlink
      className={cn(
        "relative w-min rounded-md border border-transparent px-3 py-1 text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-primary",
        className,
      )}
      activeClassName="text-primary"
      {...props}
    >
      {children}
      {active ? (
        <motion.div
          layoutId="navbar-link"
          className="absolute -left-2 bottom-1 top-1 w-[2px] rounded-full bg-amber-500"
        />
      ) : null}
    </Navlink>
  );
};
