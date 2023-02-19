import { forwardRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  images: File[];
  setImages: (images: File[]) => void;
  unselectImage: (at: number) => void;
};

export const Dropzone = forwardRef<HTMLInputElement, Props>(
  ({ images, setImages, unselectImage }: Props, ref) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
      setImages(acceptedFiles);
    }, [setImages]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".png"],
      },
    });

    return (
      <div>
        <div
          className="p-12 cursor-pointer hover:bg-gray-100 border border-dashed rounded"
          {...getRootProps()}
        >
          <input {...getInputProps()} ref={ref} />
          {isDragActive
            ? <p>Drop the files here ...</p>
            : <p>Drag 'n' drop some files here, or click to select files</p>}
        </div>
        <div>
          {images.map((image, index) => (
            <div key={index} className="flex items-center">
              <img
                className="w-24"
                src={URL.createObjectURL(image)}
                alt={image.name}
              />
              <div
                className="cursor-pointer"
                onClick={() =>
                  unselectImage(index)}
              >
                削除
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
