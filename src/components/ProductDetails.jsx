import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/Context";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const productData = JSON.parse(localStorage.getItem("product"));
  const { firestore } = useContext(FirebaseContext);
  const [sellerDetails, setSellerDetails] = useState();
  const { productId } = useParams();

  useEffect(() => {
    const userDocRef = doc(firestore, "users", productData.user_id);

    getDoc(userDocRef)
      .then((userDoc) => {
        if (userDoc.exists()) {
          setSellerDetails(userDoc.data());
        } else {
          console.log("No such user!");
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  return (
    <div className="p-3 h-[30rem]">
      <div className="h-full flex rounded-md">
        <div className="bg-black w-3/4 rounded-l-md text-white">
          <img
            src={productData.image}
            alt="product image"
            className="object-contain w-full h-full"
          />
        </div>
        <div className="bg-gray-100 w-1/4 p-3 rounded-r-md">
          <div className="bg-white h-[60%] rounded-md mt-3 p-3">
            <div className="flex flex-col">
              <h3 className="underline text-lg font-bold">Product Details</h3>
              <span className="pl-2 mt-2">{productData.name}</span>
              <span className="pl-2 mt-1">₹{productData.price}</span>
              <span className="pl-2 mt-1">
                Category : {productData.category}
              </span>
              <span className="pl-2 mt-1">
                Description : {productData.description}
              </span>
            </div>
          </div>
          <div className="bg-white h-[30%] rounded-md mt-5 p-3">
            <div className="flex flex-col">
              <h3 className="underline text-lg font-bold">Seller Details</h3>
              {sellerDetails ? (
                <>
                  <span className="pl-2 mt-1">{sellerDetails.name}</span>
                  <span className="pl-2 mt-1">
                    {sellerDetails.phone_number}
                  </span>
                  <span className="pl-2 mt-1">{sellerDetails.email}</span>
                </>
              ) : (
                <div role="status" className="max-w-sm animate-pulse">
                  <div className="h-2 bg-gray-200 rounded-full w-48 mb-3 mt-3"></div>
                  <div className="h-2 bg-gray-200 rounded-full w-48 mb-3 mt-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full w-48 mb-3 mt-4"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
