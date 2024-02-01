import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useSearchContext } from "../contexts/SearchContext";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      adultCount,
      childCount,
      checkIn,
      checkOut
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      className="-mt-2 border border-slate-500 bg-slate-400 h-auto rounded-lg flex"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 w-full lg:grid-cols-2 xl:grid-cols-3 mb-2 sm:ml-36 md:-ml-1 ">
        <div className="ml-2 mt-2 flex ">
          <MdTravelExplore className="text-2xl" />
          <input
            type="text"
            className="bg-white sm:ml-20"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div>
          <label className="ml-2 mt-2 flex">
            Adult Count :
            <input
              min={1}
              type="number"
              className="ml-2 bg-white"
              value={adultCount}
              onChange={(e) => setAdultCount(parseInt(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label className="ml-2 mt-2 flex">
            Child Count :
            <input
              min={0}
              type="number"
              className="ml-2 bg-white"
              value={childCount}
              onChange={(e) => setChildCount(parseInt(e.target.value))}
            />
          </label>
        </div>
        <div className="flex mt-4 ml-3">
          <label>
            Check-in :
            <span className="ml-7">
              <DatePicker
                selected={checkIn}
                onChange={(date) => setCheckIn(date as Date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Check-in Date"
              />
            </span>
          </label>
        </div>
        <div className="mt-4 ml-2">
          <label>
            Check-out :
            <span className="ml-5">
              <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date as Date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Check-in Date"
              />
            </span>
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="mt-2 px-4 bg-slate-300 p-2 border border-slate-700 rounded-lg hover:bg-slate-200 font-semibold "
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
