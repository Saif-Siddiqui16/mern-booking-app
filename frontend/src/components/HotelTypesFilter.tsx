import { hotelTypes } from "../config/hotel-options-config";

type Props = {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
  return (
    <div className="border-b-2 border-slate-500 pb-4">
      <h2 className="font-semibold">Star Ratings :</h2>

      <div className="ml-4 mt-3">
        {hotelTypes.map((type) => {
          return (
            <label className="flex mt-1">
              <input
                type="checkbox"
                value={type}
                checked={selectedHotelTypes.includes(type)}
                onChange={onChange}
              />
              <span className="ml-2">{type}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default HotelTypesFilter;
