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
      size={"icon"}
      onClick={() => handleSignOut()}
      className="text-muted-foreground/50 hover:text-red-500"
    >
      <LogOut />
    </Button>
  );
};
