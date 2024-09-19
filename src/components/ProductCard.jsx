import React from "react";

const ProductCard = () => {
  return (
    <div className="p-5">
      <div className="border border-gray-400 w-72 rounded-sm">
        <div className="w-full p-2">
          <div className="w-full h-52">
            <img
              src="assets/images/img-watch.jpg"
              alt="Product Image"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-4">
            <div>
              <span className="text-xl font-extrabold">$ 1000</span>
            </div>
            <div>
              <span className="text-md font-semibold">Product Name</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">Category</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
