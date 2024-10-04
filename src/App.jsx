import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import SellPage from "./pages/SellPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { FirebaseContext } from "./context/Context";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";

function App() {
  const { auth, setUser } = useContext(FirebaseContext);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<RedirectIfAuthenticated />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/add-product" element={<SellPage />} />
          <Route
            path="/view-product/:productId"
            element={<ProductDetailPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
