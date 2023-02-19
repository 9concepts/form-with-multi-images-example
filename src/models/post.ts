import { z } from "zod";

const MAX_TITLE_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 100;

export const Post = z.object({
  title: z.string()
    .min(1, { message: "入力してください。" })
    .max(MAX_TITLE_LENGTH, { message: `${MAX_TITLE_LENGTH}文字以内で入力してください。` }),
  description: z.string()
    .min(1, { message: "入力してください。" })
    .max(MAX_DESCRIPTION_LENGTH, {
      message: `${MAX_DESCRIPTION_LENGTH}文字以内で入力してください。`,
    }),
});

export type Post = z.infer<typeof Post>;
