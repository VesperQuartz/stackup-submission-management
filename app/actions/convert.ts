"use server"
import { z } from "zod";
import { zfd } from "zod-form-data";
import { writeFile } from "fs/promises";
import crypto from "crypto";
import { put } from '@vercel/blob';
import gm from "gm";
const magick = gm.subClass({ imageMagick: false });

const formSchema = zfd.formData({
  file: zfd.file().array().min(2, { message: "Please upload at least 2 files" }).max(10, { message: "You can upload up to 10 images" }),
  filename: zfd.text(z.string({ required_error: "Please enter file name to save as" }).min(1, { message: "Please enter filename to save as" }).transform(x => x.replaceAll(/\s+/g, "-"))),
  orientation: zfd.checkbox(),
});

export const convertAction = async (_prevState: any, formData: FormData) => {
  const data = formSchema.safeParse(formData);
  if (!data.success) {
    return { error: data.error.issues[0].message };
  }

  const { file, filename, orientation } = data.data;
  for (let f of file) {
    if (!f.type.startsWith("image")) {
      return { error: "Please upload only images" };
    }
  }
  try {
    const arrayBuffers = await Promise.all(file.map(f => f.arrayBuffer()));
    const buffers = arrayBuffers.map(buffer => Buffer.from(buffer));

    const filepaths = await Promise.all(buffers.map(async (buffer) => {
      const filepath = `/tmp/${crypto.randomUUID()}.png`;
      try {
        await writeFile(filepath, buffer);
        return filepath;
      } catch (error) {
        console.error("err: ", error);
        return { error: "Cannot write file to disk!" };
      }
    }));

    const result = await new Promise((resolve, reject) => {
      const img = magick(filepaths[0] as string).command("convert").in(orientation ? "-append" : "+append");
      img.append.apply(img, [filepaths.slice(1) as Array<string>]).toBuffer("PNG", async (err, buffer) => {
        if (err) {
          reject({ error: "Cannot convert file " + err });
        } else {
          const stream = new Uint8Array(buffer);
          try {
            const { downloadUrl } = await put(filename, stream, { access: "public", addRandomSuffix: false });
            console.log(downloadUrl)
            resolve({ message: downloadUrl });
          } catch (uploadError) {
            reject({ error: "Cannot upload file" });
          }
        }
      });
    });

    return result;

  } catch (error) {
    console.error("err: ", error);
    return { error: "An error occurred during file conversion" };
  }
};

export const resetState = async () => {
  return { messgae: "haha" };
}
