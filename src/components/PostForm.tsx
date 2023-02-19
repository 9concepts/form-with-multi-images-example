import { SubmitHandler, useForm } from "react-hook-form";
import { getStorage, ref, uploadBytes } from "firebase/storage";

type PostInput = {
  title: string;
  description: string;
  images: FileList;
};

const MAX_TITLE_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 100;

export const PostForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<
    PostInput
  >();
  const onSubmit: SubmitHandler<PostInput> = (data) => {
    console.log(data);

    const images = Array.from(data.images);
    images.forEach((image) => {
      const storage = getStorage();
      const imageRef = ref(storage, image.name);

      uploadBytes(imageRef, image).then(() =>
        console.log(`Uploaded: ${image.name}`)
      );
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label style={{ display: "block" }}>
        画像
        <input
          type="file"
          accept="image/*"
          {...register("images", {
            required: "必須です。",
          })}
          multiple
        />
        {errors.images && (
          <p style={{ color: "tomato" }}>{errors.images.message}</p>
        )}
      </label>
      <label style={{ display: "block" }}>
        タイトル
        <input
          {...register("title", {
            required: "必須です。",
            maxLength: {
              value: MAX_TITLE_LENGTH,
              message: `${MAX_TITLE_LENGTH}文字以内で入力してください。`,
            },
          })}
        />
        {errors.title && (
          <p style={{ color: "tomato" }}>{errors.title.message}</p>
        )}
      </label>
      <label style={{ display: "block" }}>
        説明
        <textarea
          {...register("description", {
            required: "必須です。",
            maxLength: {
              value: MAX_DESCRIPTION_LENGTH,
              message: `${MAX_DESCRIPTION_LENGTH}文字以内で入力してください。`,
            },
          })}
        />
        {errors.description && (
          <p style={{ color: "tomato" }}>{errors.description.message}</p>
        )}
      </label>

      <input type="submit" />
    </form>
  );
};
