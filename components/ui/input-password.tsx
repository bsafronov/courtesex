"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { Input } from "./input";

export interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const InputPassword = React.forwardRef<
  HTMLInputElement,
  InputPasswordProps
>(({ className, type, ...props }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  return (
    <div className="relative">
      <Input
        ref={ref}
        className={cn("pr-12")}
        type={isPasswordVisible ? "text" : "password"}
        {...props}
      />
      <button
        type="button"
        className="text-input hover:text-muted-foreground transition-colors absolute right-3 top-1/2 -translate-y-1/2"
        onClick={() => setIsPasswordVisible((prev) => !prev)}
      >
        {isPasswordVisible ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
});
InputPassword.displayName = "InputPassword";
