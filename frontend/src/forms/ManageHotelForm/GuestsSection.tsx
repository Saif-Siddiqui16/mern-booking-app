import { useFormContext } from "react-hook-form";
import { ManageHotelForm } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ManageHotelForm>();

  return (
    <div>
      <h2 className="font-semibold mt-5">Guest Informations :</h2>
      <div className="flex flex-col md:flex-row  bg-slate-400 border rounded-lg mt-2">
        <div className=" flex gap-5 p-3">
          <label className="font-semibold">
            Adult Count :
            <input
              type="number"
              className="border border-blue-400 w-full rounded p-1 font-normal"
              {...register("adultCount", {
                required: "This field is required",
              })}
            />
            {errors.adultCount && (
              <span className="text-red-400">{errors.adultCount.message}</span>
            )}
          </label>
          <label className="font-semibold">
            Child Count :
            <input
              type="number"
              className="border border-blue-400 w-full rounded p-1 font-normal"
              {...register("childCount", {
                required: "This field is required",
              })}
            />
            {errors.childCount && (
              <span className="text-red-400">{errors.childCount.message}</span>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default GuestsSection;
