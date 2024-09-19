import React from "react";

const Navbar = () => {
  return (
    <div className="bg-gray-100 py-2 px-4 flex items-center shadow-md h-16">
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
      <div className="flex items-center space-x-10 ml-11">
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
        <a href="#" className="text-gray-700 hover:underline">
          Login
        </a>
        <div className="cursor-pointer">
          <img
            src="assets/images/sell-button.png"
            alt="sell"
            width={80}
            className="rounded-full"
          />
          <span className="absolute top-5 right-[5.2rem]">+ Sell</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
