import { hotelFacilities } from "../config/hotel-options-config";

type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
  return (
    <div className="border-b-2 border-slate-500 pb-4">
      <h2 className="font-semibold">Star Ratings :</h2>

      <div className="ml-4 mt-3">
        {hotelFacilities.map((facility) => {
          return (
            <label className="flex mt-1">
              <input
                type="checkbox"
                value={facility}
                checked={selectedFacilities.includes(facility)}
                onChange={onChange}
              />
              <span className="ml-2">{facility} Stars</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default FacilitiesFilter;
