import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/view-product/${product.id}`)
  }

  return (
    <div className="p-5 cursor-pointer" onClick={handleClick}>
      <div className="border border-gray-400 w-56 rounded-sm">
        <div className="w-full p-2">
          <div className="w-full h-48">
            <img
              src={product.image}
              alt="Product Image"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="px-3 pt-3">
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
