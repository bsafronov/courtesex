"use client";

import { signUp } from "@/actions/sign-up";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldController } from "@/components/ui/field-controller";
import { FormController } from "@/components/ui/form-controller";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { useZodForm } from "@/lib/use-zod-form";
import { signUpSchema } from "@/schema/sign-up";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";

export default function Page() {
  const form = useZodForm(signUpSchema, {
    defaultValues: {
      username: "",
      password: "",
      rePassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onError: (e) => toast.error(e.message),
  });

  const onSubmit = form.handleSubmit(async (data) => mutate(data));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
      </CardHeader>
      <CardContent>
        <FormController
          form={form}
          onSubmit={onSubmit}
          submitText="Регистрация"
          isLoading={isPending}
        >
          <FieldController
            control={form.control}
            name="username"
            label="Имя пользователя"
            required
            render={(props) => <Input {...props} />}
          />
          <FieldController
            control={form.control}
            name="password"
            label="Пароль"
            required
            render={(props) => <InputPassword {...props} />}
          />
          <FieldController
            control={form.control}
            name="rePassword"
            label="Повторите пароль"
            required
            render={(props) => <InputPassword {...props} />}
          />
        </FormController>
      </CardContent>
      <CardFooter className="text-xs">
        <p>
          Есть аккаунт?{" "}
          <Link href={"/auth/sign-in"} className="text-blue-500">
            Войти
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
