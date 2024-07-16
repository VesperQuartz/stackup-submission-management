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
import { EllipsisVertical, SquareArrowOutUpRight, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

export const Submissions = () => {
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
    <div className="md:grid md:grid-cols-3 md:gap-x-4 p-2 m-2">
      {submission?.map((sub) => {
        return (
          <Card key={sub._id}>
            <CardContent
              style={{ backgroundImage: `url(${sub.imageUrl})` }}
              className="h-40 bg-cover bg-center"
            ></CardContent>
            <CardHeader className="flex flex-col justify-center">
              <CardTitle>{sub.campaignTitle}</CardTitle>
              <CardDescription>{sub.questTitle}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end">
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
