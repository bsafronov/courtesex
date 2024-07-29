"use server";

import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";

type Props = {
  redirect?: string;
};
export const auth = async (props?: Props) => {
  const { user } = await validateRequest();

  if (user) return user;

  if (props?.redirect) {
    return redirect(props.redirect);
  }

  throw new Error("Not authenticated!");
};
