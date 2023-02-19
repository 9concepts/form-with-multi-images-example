import { SubmitHandler, useForm } from "react-hook-form";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Dropzone } from "./Dropzone";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "../models/post";

export const PostForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm<
    Post
  >({
    resolver: zodResolver(Post),
  });

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
      <div className="flex mb-6">
        <label className="w-1/3">
          画像
        </label>
        <div className="w-2/3">
          <Dropzone images={images} setImages={setImages} />
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
