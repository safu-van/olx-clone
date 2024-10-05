import React from "react";
import Navbar from "../components/NavBar";
import AddProduct from "../components/AddProduct";
import Footer from "../components/Footer";

function SellPage() {
  return (
    <div>
      <Navbar />
      <div className="mt-20 flex justify-center m-5">
        <AddProduct />
      </div>
      <Footer />
    </div>
  );
}

export default SellPage;
