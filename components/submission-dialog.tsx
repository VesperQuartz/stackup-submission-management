"use client";
import dynamic from "next/dynamic";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

const UploadSubmission = dynamic(() => import("./upload-submission"), {
  ssr: false,
});

export const SubmissionDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Submission </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <UploadSubmission />
      </DialogContent>
    </Dialog>
  );
};
