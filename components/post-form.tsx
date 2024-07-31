"use client";

import { useZodForm } from "@/lib/use-zod-form";
import { createPostSchema } from "@/schema/create-post";
import { Button } from "./ui/button";
import { Editor } from "./ui/editor";
import { FieldController } from "./ui/field-controller";
import { Form } from "./ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/actions/create-post";
import { toast } from "sonner";

type Props = {
  username: string;
};
export const PostForm = ({ username }: Props) => {
  const form = useZodForm(createPostSchema, {
    defaultValues: {
      content: "",
    },
    values: {
      content: "",
    },
  });
  const ctx = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      await ctx.invalidateQueries({
        queryKey: ["posts", username],
      });
      toast.success("Пост добавлен!");
      form.reset({
        content: "",
      });
    },
    onError: () => {
      toast.error("Произошла ошибка при добавлении поста");
    },
  });

  const onSubmit = form.handleSubmit((v) => mutate(v));

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full">
        <FieldController
          control={form.control}
          name="content"
          render={({ value, onChange }) => (
            <Editor value={value} onChange={onChange} />
          )}
        />
        <div className="flex justify-end p-4">
          <Button type="submit" variant={"ghost"} disabled={isPending}>
            Создать
          </Button>
        </div>
      </form>
    </Form>
  );
};
