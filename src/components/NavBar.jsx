import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { AuthenticationContext, FirebaseContext } from "../context/Context";

const Navbar = () => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate()

  const { user } = useContext(AuthenticationContext);
  const { auth } = useContext(FirebaseContext)

  const handleLogout = () =>{
    signOut(auth)
      .then(() => {
        navigate("/signin")
      })
      .catch((error) => {
        console.log("error while logout :", error)
      })
  }

  return (
    <div className="bg-gray-100 py-2 px-4 flex items-center shadow-md h-16 fixed top-0 left-0 w-full z-50">
      <div className="flex items-center space-x-3">
        <div>
          <img src="assets/images/logo.png" alt="logo" width={40} />
        </div>
      </div>
      <div className="flex mx-4 max-w-4xl w-full ml-10">
        <input
          type="text"
          className="w-full border-2 border-gray-950 rounded-sm px-4 py-2 text-gray-700"
          placeholder="Find Cars, Mobile Phones and more..."
        />
      </div>
      <div className="flex items-center ml-11 w-56">
        <div className="flex items-center space-x-1 text-gray-700">
          <span>ENGLISH</span>
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div className="text-gray-700 hover:underline cursor-pointer w-28 truncate flex justify-center">
          {user ? (
            <span
              className="cursor-pointer ml-6"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={handleLogout}
            >
              {hovered ? "Logout" : user.displayName}
            </span>
          ) : (
            <Link to="/signin" className="ml-7">
              Login
            </Link>
          )}
        </div>
      </div>
      <div className="cursor-pointer">
        <img
          src="assets/images/sell-button.png"
          alt="sell"
          width={80}
          className="rounded-full"
        />
        <span className="absolute top-5 right-[2.9rem]">+ Sell</span>
      </div>
    </div>
  );
};

export default Navbar;
