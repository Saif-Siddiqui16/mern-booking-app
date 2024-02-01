import { hotelTypes } from "../../config/hotel-options-config";
import { useFormContext } from "react-hook-form";
import { ManageHotelForm } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ManageHotelForm>();
  const typed = watch("type");
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold mt-5">Type :</h2>
      <div className="grid grid-cols-3 gap-2 lg:grid-cols-5">
        {hotelTypes.map((type) => {
          return (
            <label
              className={
                typed === type
                  ? "bg-blue-400 border rounded-lg p-2 flex justify-center cursor-pointer"
                  : "bg-slate-400 border rounded-lg p-2 flex justify-center cursor-pointer"
              }
            >
              <input
                value={type}
                type="radio"
                className="hidden"
                {...register("type", {
                  required: "This field is required",
                })}
              />
              <span>{type}</span>
              {errors.type && (
                <span className="text-red-400">{errors.type.message}</span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default TypeSection;
