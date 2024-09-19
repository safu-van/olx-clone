import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

function HomePage() {
  return (
    <div>
      <NavBar />
      <div className="mt-20">
        <div className="m-5 p-3 bg-gray-100 rounded-sm">
            <span className="text-xl pl-3">Products</span>
        </div>
        <div className="flex flex-wrap gap-2 m-5">
        <ProductCard />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
