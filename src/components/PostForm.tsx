import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Dropzone } from "./Dropzone";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "../models/post";

let renderingCount = 0;

export const PostForm = () => {
  renderingCount++;

  const [images, setImages] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    clearErrors,
  } = useForm<
    Post
  >({
    defaultValues: {
      images,
    },
    resolver: zodResolver(Post),
  });

  const handleImages = (images: File[]) => {
    if (images.length === 0) return;

    setImages((prevImages) => {
      return prevImages.concat(images);
    });
    setValue("images", images);
    clearErrors("images");
  };

  const unselectImage = (at: number) => {
    setImages((prevImages) => {
      const newImages = prevImages.filter((_, index) => index !== at);
      setValue("images", newImages);

      return newImages;
    });
  };

  const onSubmit: SubmitHandler<Post> = (data) => {
    console.log(data);
    images.forEach((image) => {
      const storage = getStorage();
      const imageRef = ref(storage, uuidv4());

      uploadBytes(imageRef, image).then(() =>
        console.log(`Uploaded: ${image.name}`)
      );
    });
  };

  return (
    <form
      className="w-full max-w-lg p-4 border-gray-900 border rounded"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className=" absolute right-10">Rendring count: {renderingCount}</div>
      <div className="flex mb-6">
        <label className="w-1/3">
          画像
        </label>
        <div className="w-2/3">
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <Dropzone
                images={images}
                setImages={handleImages}
                unselectImage={unselectImage}
                {...field}
              />
            )}
          />
          {errors.images && (
            <p className=" text-red-400 text-left">
              {errors.images.message?.toString()}
            </p>
          )}
        </div>
      </div>

      <div className="flex mb-6">
        <label className="w-1/3" htmlFor="title">
          タイトル
        </label>
        <div className="w-2/3">
          <input
            id="title"
            className="bg-gray-200 w-full p-1"
            {...register("title")}
          />
          {errors.title && (
            <p className=" text-red-400 text-left">{errors.title.message}</p>
          )}
        </div>
      </div>
      <div className="flex mb-6">
        <label className="w-1/3" htmlFor="description">
          説明
        </label>
        <div className="w-2/3">
          <textarea
            id="description"
            className="bg-gray-200 w-full p-1"
            {...register("description")}
          />
          {errors.description && (
            <p className=" text-red-400 text-left">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>

      <div className="text-center">
        <input
          className="text-white bg-gray-600 p-1 font-bold cursor-pointer"
          type="submit"
        />
      </div>
    </form>
  );
};
