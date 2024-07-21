"use client";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { useUploadSubmission } from "@/app/hooks/hooks";
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
  campaignTitle: z
    .string()
    .min(2, { message: "Campaign title must contain at least 2 character" })
    .max(100),
  questTitle: z
    .string()
    .min(2, { message: "Quest title must contain at least 2 character" })
    .max(100),
  submitedImage:
    typeof window === undefined
      ? z.any()
      : z
          .instanceof(globalThis.FileList)
          .refine((file) => file?.length == 1, "File is required.")
          .transform((file) => file[0]),
});

const UploadSubmission = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campaignTitle: "",
      questTitle: "",
    },
  });
  const fileRef = form.register("submitedImage");
  const { upload } = useUploadSubmission();
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(async (data) => await upload({ ...data }))}
      >
        <div>
          <FormField
            control={form.control}
            name="campaignTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="questTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quest Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="submitedImage"
            render={() => (
              <FormItem>
                <FormControl>
                  <Input type="file" accept="image/*" {...fileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button>
            {form.formState.isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "upload"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UploadSubmission;
