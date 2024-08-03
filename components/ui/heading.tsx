"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Props = {
  title: string;
};
export const Heading = ({ title }: Props) => {
  return (
    <motion.h1
      initial={{ scale: 0.8, x: -20, opacity: 0 }}
      animate={{
        scale: 1,
        x: 0,
        opacity: 1,
      }}
      className={cn("mb-16 text-2xl font-bold")}
    >
      {title}
    </motion.h1>
  );
};
