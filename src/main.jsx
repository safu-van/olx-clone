import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FirebaseContext } from "./context/FirebaseContext.js"
import { auth, firestore } from "./firebase/config.js"
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FirebaseContext.Provider value={{auth, firestore}}>
      <App />
    </FirebaseContext.Provider>
  </StrictMode>
);
