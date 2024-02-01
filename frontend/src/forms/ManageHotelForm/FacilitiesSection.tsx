import { useFormContext } from "react-hook-form";
import { ManageHotelForm } from "./ManageHotelForm";
import { hotelFacilities } from "../../config/hotel-options-config";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ManageHotelForm>();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold mt-5">Facilities :</h2>
      <div className="grid grid-cols-3 gap-2 lg:grid-cols-5">
        {hotelFacilities.map((facility) => {
          return (
            <label>
              <input
                value={facility}
                type="checkbox"
                {...register("facilities", {
                  required: "This field is required",
                })}
              />
              <span className="ml-2">{facility}</span>
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

export default FacilitiesSection;
