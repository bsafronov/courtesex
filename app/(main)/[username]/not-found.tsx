"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaFaceSadCry } from "react-icons/fa6";

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <FaFaceSadCry className="size-32 text-muted-foreground/50" />
        <h1 className="mb-2 text-2xl font-bold">Пользователь не найден!</h1>
        <Button onClick={() => router.back()}>Вернуться назад</Button>
      </div>
    </div>
  );
}
