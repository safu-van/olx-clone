import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FirebaseContext } from "../context/Context";

const Navbar = () => {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { auth, user } = useContext(FirebaseContext);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        console.log("error while logout :", error);
      });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-gray-100 py-2 px-4 flex items-center shadow-md h-16 fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-center">
          <div className="mx-3">
            <Link to="/">
              <img src="/assets/images/logo.png" alt="logo" width={40} />
            </Link>
          </div>
        </div>
        {/* Hamburger Button for mobile/tablet screens */}
        <div className="block md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex items-center mx-4 max-w-4xl w-full relative">
          <input
            type="text"
            className="w-full border-2 border-gray-950 rounded-sm px-4 py-2 text-gray-700"
            placeholder="Find Cars, Mobile Phones and more..."
          />
          <div className="w-12 h-[2.6rem] flex justify-center items-center cursor-pointer bg-gray-900 absolute right-0">
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 1024 1024"
              data-aut-id="icon"
              fill="white"
              fillRule="evenodd"
            >
              <path
                className="rui-o3KKi"
                d="M448 725.333c-152.917 0-277.333-124.416-277.333-277.333s124.416-277.333 277.333-277.333c152.917 0 277.333 124.416 277.333 277.333s-124.416 277.333-277.333 277.333v0zM884.437 824.107v0.021l-151.915-151.936c48.768-61.781 78.144-139.541 78.144-224.192 0-199.979-162.688-362.667-362.667-362.667s-362.667 162.688-362.667 362.667c0 199.979 162.688 362.667 362.667 362.667 84.629 0 162.411-29.376 224.171-78.144l206.144 206.144h60.352v-60.331l-54.229-54.229z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="hidden md:flex items-center ml-4 md:ml-11 w-56 space-x-4">
          <div className="flex items-center space-x-1 text-gray-700 cursor-pointer">
            <span>English</span>
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
                className="cursor-pointer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={handleLogout}
              >
                {hovered ? "Logout" : user.displayName}
              </span>
            ) : (
              <Link to="/signin">Login</Link>
            )}
          </div>
        </div>
        <div className="hidden md:flex cursor-pointer">
          <Link to="/add-product">
            <img
              src="/assets/images/sell-button.png"
              alt="sell"
              width={80}
              className="rounded-full"
            />
            <span className="absolute top-5 right-10">+ Sell</span>
          </Link>
        </div>
      </div>

      {/* Mobile view navbar */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-100 shadow-md">
          <div className="flex flex-col items-center py-4 space-y-2">
            <input
              type="text"
              className="w-[90%] border-2 border-gray-950 rounded-sm px-4 py-2 text-gray-700"
              placeholder="Find Cars, Mobile Phones and more..."
            />
            <div className="flex flex-col w-full md:px-10 px-8 space-y-2">
              <div className="text-gray-700 hover:underline cursor-pointer mt-3">
                {user ? (
                  <div className="flex flex-col">
                    <span>Welcome {user.displayName}</span>
                    <span
                      className="mt-2"
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                    >
                      Logout
                    </span>
                  </div>
                ) : (
                  <Link to="/signin" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                )}
              </div>
              <Link
                to="/add-product"
                className="text-gray-700 hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Sell Product
              </Link>
              <div className="flex items-center space-x-1 text-gray-700 cursor-pointer">
                <span>English</span>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
