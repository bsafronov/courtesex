import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export const Post = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>BS</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="">@bsafronov</span>
            <span className="text-muted-foreground text-xs">24.07.2024 г.</span>
          </div>
        </div>
        <Button size={"icon"} variant={"ghost"}>
          <MoreHorizontal />
        </Button>
      </div>
      <div className="my-8">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi saepe,
          fuga, officiis placeat totam tempore est, veritatis voluptatibus sint
          fugit molestias consequuntur at atque quisquam. Quia ex beatae autem
          placeat!
        </p>
      </div>
    </Card>
  );
};
