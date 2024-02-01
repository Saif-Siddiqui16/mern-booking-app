import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import { useAppContext } from "../contexts/AppContext";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="flex bg-blue-700">
      <div className=" flex flex-row p-10 justify-between items-center w-full">
        <div className="ml-20 font-extrabold text-3xl">
          <span className="text-white">
            <Link to="/">Hotel Booking</Link>
          </span>
        </div>
        <div className="flex flex-row gap-3 mr-10">
          {isLoggedIn ? (
            <>
              <SignOutButton />
              <div className="bg-blue-600 p-2 text-white hover:bg-blue-500 border border-white rounded-lg">
                <Link to="/add-hotel">Add Hotel</Link>
              </div>
            </>
          ) : (
            <div className="bg-blue-600 p-2 text-white hover:bg-blue-500 border border-white rounded-lg">
              <Link to="/sign-in">Sign In</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
