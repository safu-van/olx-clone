import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import SellPage from "./pages/SellPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { AuthenticationContext, FirebaseContext } from "./context/Context";


function App() {
  const {setUser} = useContext(AuthenticationContext)
  const {auth} = useContext(FirebaseContext)
  
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/addproduct" element={<SellPage />} />
        <Route path="/view-product" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
