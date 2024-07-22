"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { match } from "ts-pattern";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";

export const ActionButton = ({
  className,
  text,
}: {
  className?: string;
  text: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button key={nanoid()} disabled={pending} className={cn(className)}>
      {match(pending)
        .with(true, () => <LoaderCircle className="animate-spin" />)
        .with(false, () => text)
        .exhaustive()}
    </Button>
  );
};
