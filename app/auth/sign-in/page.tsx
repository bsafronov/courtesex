"use client";

import { signIn } from "@/actions/sign-in";
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
import { signInSchema } from "@/schema/sign-in";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";

export default function Page() {
  const form = useZodForm(signInSchema, {
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onError: (e) => toast.error(e.message),
  });

  const onSubmit = form.handleSubmit(async (data) => mutate(data));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Авторизация</CardTitle>
      </CardHeader>
      <CardContent>
        <FormController
          form={form}
          onSubmit={onSubmit}
          isLoading={isPending}
          submitText="Войти"
        >
          <FieldController
            control={form.control}
            name="username"
            label="Логин"
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
        </FormController>
      </CardContent>
      <CardFooter className="text-xs">
        <p>
          Нет аккаунта?{" "}
          <Link href={"/auth/sign-up"} className="text-blue-500">
            Регистрация
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
