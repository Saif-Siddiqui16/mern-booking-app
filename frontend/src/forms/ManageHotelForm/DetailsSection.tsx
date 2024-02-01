import { useFormContext } from "react-hook-form";
import { ManageHotelForm } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ManageHotelForm>();
  return (
    <div className="flex flex-col gap-4">
      <h2 className="flex justify-center text-2xl font-semibold">
        Add Hotel Details :
      </h2>
      <label className="font-semibold">
        Name :
        <input
          type="text"
          className="border border-blue-400 w-full rounded p-1 font-normal"
          {...register("name", {
            required: "This field is required",
          })}
        />
        {errors.name && (
          <span className="text-red-400">{errors.name.message}</span>
        )}
      </label>
      <div className="md:flex flex-row gap-4">
        <label className="font-semibold">
          Country :
          <input
            type="text"
            className="border border-blue-400 w-full rounded p-1 font-normal"
            {...register("country", {
              required: "This field is required",
            })}
          />
          {errors.country && (
            <span className="text-red-400">{errors.country.message}</span>
          )}
        </label>
        <label className="font-semibold">
          City :
          <input
            type="text"
            className="border border-blue-400 w-full rounded p-1 font-normal"
            {...register("city", {
              required: "This field is required",
            })}
          />
          {errors.city && (
            <span className="text-red-400">{errors.city.message}</span>
          )}
        </label>
      </div>

      <label className="font-semibold">
        Description :
        <textarea
          rows={10}
          className="border border-blue-400 w-full rounded p-1 font-normal"
        />
      </label>

      <label className="font-semibold">
        Price Per Night :
        <input
          type="number"
          className="border border-blue-400  rounded p-1 font-normal ml-4"
          {...register("pricePerNight", {
            required: "This field is required",
          })}
        />
        {errors.pricePerNight && (
          <span className="text-red-400">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="font-semibold mt-2">
        Star Rating :
        <select
          className="ml-4"
          {...register("starRating", {
            required: "This field is required",
          })}
        >
          <option>--Select Star Rating--</option>
          {["1", "2", "3", "4", "5"].map((star) => {
            return (
              <option className="flex" value={star}>
                {star}
              </option>
            );
          })}
        </select>
        {errors.starRating && (
          <span className="text-red-400">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
