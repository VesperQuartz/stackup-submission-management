import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"

export const useUploadSubmission = () => {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const sendSubmission = useMutation(api.files.addASubmission);
  const handleSendImage = async ({ campaignTitle, questTitle, submitedImage }: {
    campaignTitle: string;
    questTitle: string;
    submitedImage: File | null;
  }) => {
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": submitedImage!.type },
      body: submitedImage
    })
    const { storageId } = await result.json();
    await sendSubmission({ campaignTitle, questTitle, imageKey: storageId })
  }
  return { upload: handleSendImage }
}
