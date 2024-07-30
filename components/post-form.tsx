"use client";

import { useZodForm } from "@/lib/use-zod-form";
import { createPostSchema } from "@/schema/create-post";
import { Button } from "./ui/button";
import { Editor } from "./ui/editor";
import { FieldController } from "./ui/field-controller";
import { Form } from "./ui/form";

export const PostForm = () => {
  const form = useZodForm(createPostSchema, {
    values: {
      content: "",
    },
  });

  const onSubmit = form.handleSubmit((v) => console.log(v));

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full rounded-md border">
        <FieldController
          control={form.control}
          name="content"
          render={({ value, onChange }) => (
            <Editor value={value} onChange={onChange} />
          )}
        />
        <div className="flex justify-end p-4">
          <Button type="submit">Создать</Button>
        </div>
      </form>
    </Form>
  );
};
