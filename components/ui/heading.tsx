import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"h1">;
export const Heading = ({ className, ...props }: Props) => {
  return (
    <h1 className={cn("mb-16 text-2xl font-bold", className)} {...props} />
  );
};
