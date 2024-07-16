"use client";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { UploadSubmission } from "./upload-submission";

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
