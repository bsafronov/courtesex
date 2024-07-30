"use client";

import { cn } from "@/lib/utils";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  LucideIcon,
  Quote,
  Strikethrough,
  UnderlineIcon,
} from "lucide-react";
import { Button } from "../button";

type Props = {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export const Editor = ({ className, onChange, value }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn(
          "hover:outline-none outline-none prose prose-zinc dark:prose-invert",
          className,
        ),
      },
    },
    content: value,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className={"grow rounded-md"}>
      <div className="flex divide-x border-b">
        <div className="space-x-1 p-1">
          <ToggleButton
            icon={Heading1}
            pressed={editor.isActive("heading", { level: 1 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            disabled={
              !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
            }
          />
          <ToggleButton
            icon={Heading2}
            pressed={editor.isActive("heading", { level: 2 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            disabled={
              !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
            }
          />
          <ToggleButton
            icon={Heading3}
            pressed={editor.isActive("heading", { level: 3 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            disabled={
              !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
            }
          />
        </div>
        <div className="space-x-1 p-1">
          <ToggleButton
            icon={Bold}
            pressed={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
          />
          <ToggleButton
            icon={Italic}
            pressed={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
          />
          <ToggleButton
            icon={Quote}
            pressed={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            disabled={!editor.can().chain().focus().toggleBlockquote().run()}
          />
          <ToggleButton
            icon={Code}
            pressed={editor.isActive("code")}
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
          />
          <ToggleButton
            icon={UnderlineIcon}
            pressed={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
          />
          <ToggleButton
            icon={Strikethrough}
            pressed={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
          />
        </div>
        <div className="space-x-1 p-1">
          <ToggleButton
            icon={List}
            pressed={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={!editor.can().chain().focus().toggleBulletList().run()}
          />
          <ToggleButton
            icon={ListOrdered}
            pressed={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={!editor.can().chain().focus().toggleOrderedList().run()}
          />
        </div>
      </div>
      <div className="p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

type ToggleButtonProps = {
  onClick?: () => void;
  pressed?: boolean;
  disabled?: boolean;
  icon: LucideIcon;
};

const ToggleButton = ({
  onClick,
  icon: Icon,
  disabled,
  pressed,
}: ToggleButtonProps) => {
  return (
    <Button
      size={"icon"}
      variant={pressed ? "secondary" : "ghost"}
      className=""
      onClick={onClick}
      disabled={disabled}
    >
      <Icon />
    </Button>
  );
};
