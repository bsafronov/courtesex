"use client";

import { signOut } from "@/actions/sign-out";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export const SignOutButton = () => {
  const { mutate: handleSignOut } = useMutation({
    mutationFn: signOut,
  });
  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      onClick={() => handleSignOut()}
      className="justify-start gap-2 text-base font-normal text-muted-foreground hover:text-red-500"
    >
      <LogOut className="size-4 text-red-500" />
      Выйти
    </Button>
  );
};
