"use client";

import { useZodForm } from "@/lib/use-zod-form";
import { Button } from "./ui/button";
import { Editor } from "./ui/editor";
import { FieldController } from "./ui/field-controller";
import { Form } from "./ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/actions/create-post";
import { toast } from "sonner";
import { createCommentSchema } from "@/schema/create-comment";
import { createComment } from "@/actions/create-comment";

type Props = {
  postId: ID;
};

export const CommentForm = ({ postId }: Props) => {
  const form = useZodForm(createCommentSchema, {
    values: {
      content: "",
      postId,
    },
  });
  const ctx = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createComment,
    onSuccess: async () => {
      await ctx.invalidateQueries({ queryKey: ["post-comments", postId] });

      toast.success("Комментарий добавлен!");
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
