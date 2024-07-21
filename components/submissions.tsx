"use client";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import {
  EllipsisVertical,
  SquareArrowOutUpRight,
  Trash,
  Link as ShareLink,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import React from "react";
import { useToast } from "./ui/use-toast";

export const Submissions = () => {
  const { toast } = useToast();
  const submission = useQuery(api.files.getAllSubmission);
  const deleteSub = useMutation(api.files.deletedSubmission);
  if (submission === undefined) {
    return null;
  } else if (submission.length === 0) {
    return (
      <div className="flex w-full justify-center items-center">
        <Image
          src="/undraw_add_file_re_s4qf.svg"
          alt="file-upload"
          width={400}
          height={400}
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-4 p-2 m-2">
      {submission?.map((sub) => {
        return (
          <Card key={sub._id} className="min-h-[20rem]">
            <CardContent
              style={{ backgroundImage: `url(${sub.imageUrl})` }}
              className="min-h-40 bg-cover bg-center"
            ></CardContent>
            <CardHeader className="flex flex-col justify-center mt-auto">
              <CardTitle>{sub.campaignTitle}</CardTitle>
              <CardDescription>{sub.questTitle}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end mt-auto gap-2">
              <ShareLink
                className="cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(sub.imageUrl!);
                  toast({
                    title: "Link Copied",
                    description: "Link copied to clipboard",
                  });
                }}
              />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={async () =>
                      await deleteSub({
                        id: sub._id,
                      })
                    }
                  >
                    <Trash />
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SquareArrowOutUpRight />{" "}
                    <Link href={sub.imageUrl!} target="_blank">
                      {" "}
                      Open
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
