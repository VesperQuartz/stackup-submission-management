"use client";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CloudDownload } from "lucide-react";
import Image from "next/image";
import React from "react";
import { ActionButton } from "@/components/action-button";
import { useFormState } from "react-dom";
import { convertAction } from "../actions/convert";
import { ErrorHandler } from "@/components/error-handler";
import crypto from "crypto";

const Tools = () => {
  const [images, setImages] = React.useState<FileList | null>(null);
  const [imageUrls, setImageUrls] = React.useState<Array<string>>([]);
  React.useEffect(() => {
    if (images) {
      const urls = Array.from(images).map((image) =>
        URL.createObjectURL(image),
      );
      setImageUrls(urls);
    }
  }, [images]);
  const [state, action] = useFormState(convertAction, null);
  return (
    <main className="p-2 flex items-center justify-center">
      <div className="flex gap-2">
        <form action={action} className="flex flex-col gap-2">
          <Card className="md:w-[300px] md:h-[300px]">
            <Label
              htmlFor="file"
              className="m-1 w-full h-full flex justify-center items-center"
            >
              <div className="flex flex-col justify-center items-center">
                <CloudDownload color="#000000" size={60} />
                <span>Upload your files</span>
                <span className="text-xs">You can upload multiple file</span>
                <span className="text-xs">use wisely</span>
              </div>
            </Label>
            <Input
              type="file"
              id="file"
              multiple
              name="file"
              className="hidden"
              accept="image/*"
              onChange={(event) => {
                setImages(event.target.files);
              }}
            />
          </Card>
          <Input name="filename" placeholder="e.g C00_Q0_yourstackupname.png" />
          <div className="flex gap-2 items-center justify-center">
            <span>Landscape</span>
            <Switch name="orientation" />
            <span>Portrait</span>
          </div>
          <ActionButton text="Convert" />
          {state ? <ErrorHandler state={state} /> : null}
        </form>
        <div className="flex flex-col flex-wrap gap-1">
          {imageUrls.map((image) => {
            return (
              <Image
                key={crypto.randomUUID()}
                src={image}
                alt={image}
                width={100}
                height={100}
                className="rounded-none"
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};
export default Tools;
