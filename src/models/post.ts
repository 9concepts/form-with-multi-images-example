import { z } from "zod";

const MAX_TITLE_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 100;
const MAX_IMAGES_NUM = 3;

export const Post = z.object({
  title: z.string()
    .min(1, { message: "入力してください。" })
    .max(MAX_TITLE_LENGTH, { message: `${MAX_TITLE_LENGTH}文字以内で入力してください。` }),
  description: z.string()
    .min(1, { message: "入力してください。" })
    .max(MAX_DESCRIPTION_LENGTH, {
      message: `${MAX_DESCRIPTION_LENGTH}文字以内で入力してください。`,
    }),
  images: z.array(z.instanceof(File)).min(1, { message: "選択してください。" }),
  // TODO
  // .max(3, {
  //   message: `選択できる画像は${MAX_IMAGES_NUM}つまでです。`,
  // }),
});

export type Post = z.infer<typeof Post>;
