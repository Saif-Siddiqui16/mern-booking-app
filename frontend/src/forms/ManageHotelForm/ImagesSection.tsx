import { useFormContext } from "react-hook-form";
import { ManageHotelForm } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ManageHotelForm>();

  const existingImageUrl = watch("imageUrls");

  return (
    <div>
      <h2>Image</h2>
      <div>
        {existingImageUrl && (
          <div>
            {existingImageUrl.map((url) => {
              return (
                <div className="relative group">
                  <img src={url} className="min-h-full object-cover" />
                  <button>Delete</button>
                </div>
              );
            })}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrl?.length || 0);
              if (totalLength === 0) {
                return "At least one image should be added";
              }
              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
