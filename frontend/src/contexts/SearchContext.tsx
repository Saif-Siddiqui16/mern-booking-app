import React, { useContext, useState } from "react";

type SearchContext = {
  destination: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    adultCount: number,
    childCount: number,
    checkIn: Date,
    checkOut: Date
  ) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

export const SearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [destination, setDestination] = useState<string>(
    () => sessionStorage.getItem("destination") || ""
  );
  const [adultCount, setAdultCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem("adultCount") || "1")
  );
  const [childCount, setChildCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem("childCount") || "0")
  );
  const [checkIn, setCheckIn] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem("checkIn") || new Date().toISOString())
  );
  const [checkOut, setCheckOut] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem("checkOut") || new Date().toISOString())
  );
  const [hotelId, setHotelId] = useState<string>(
    () => sessionStorage.getItem("hotelID") || ""
  );

  const saveSearchValues = (
    destination: string,
    adultCount: number,
    childCount: number,
    checkIn: Date,
    checkOut: Date,
    hotelId?: string
  ) => {
    setDestination(destination);
    setAdultCount(adultCount);
    setChildCount(childCount);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    if (hotelId) {
      setHotelId(hotelId);
    }

    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());

    if (hotelId) {
      sessionStorage.setItem("hotelId", hotelId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        adultCount,
        childCount,
        checkIn,
        checkOut,
        hotelId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContext;
};
