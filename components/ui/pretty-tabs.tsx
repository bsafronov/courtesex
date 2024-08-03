"use client";

import { cn } from "@/lib/utils";
import { PrettyTab } from "./pretty-tab";

export type PrettyTab = {
  children: React.ReactNode;
  href: string;
  exact?: boolean;
};

type Props = {
  items: PrettyTab[];
  name: string;
  className?: string;
};

export const PrettyTabs = ({ items, className, name }: Props) => {
  return (
    <div className={cn("-ml-3 mb-8 flex gap-2", className)}>
      {items.map((item) => (
        <PrettyTab
          key={item.href}
          name={name}
          className="rounded-md px-3 py-1 text-muted-foreground hover:bg-muted/50 hover:text-primary"
          classNameActive="text-primary"
          classNameActiveElement="-bottom-2 left-4 right-4 h-[2px] rounded-full bg-amber-500"
          {...item}
        />
      ))}
    </div>
  );
};
