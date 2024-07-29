import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z.string(),
    password: z.string(),
    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
