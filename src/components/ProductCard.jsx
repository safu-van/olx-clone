import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="p-5">
      <div className="border border-gray-400 w-72 rounded-sm">
        <div className="w-full p-2">
          <div className="w-full h-52">
            <img
              src={product.image}
              alt="Product Image"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-4">
            <div>
              <span className="text-xl font-extrabold">₹{product.price}</span>
            </div>
            <div>
              <span className="text-md font-semibold">{product.name}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">{product.category}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
