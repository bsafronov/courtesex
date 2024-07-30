"use client";

import { cn } from "@/lib/utils";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import TextareaAutosize from "react-textarea-autosize";

export const Textarea = forwardRef<
  ElementRef<typeof TextareaAutosize>,
  ComponentPropsWithoutRef<typeof TextareaAutosize>
>(({ className, ...props }, ref) => {
  return (
    <TextareaAutosize
      ref={ref}
      className={cn(
        "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-10 w-full resize-none rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();

          const form = e.currentTarget.closest("form");
          if (form) {
            form.requestSubmit();
          }
          return e;
        }
        return props.onKeyDown?.(e);
      }}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
