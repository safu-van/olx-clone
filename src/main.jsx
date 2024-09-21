import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FirebaseContext, AuthContext } from "./context/Context.jsx"
import { auth, firestore } from "./firebase/config.js"
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FirebaseContext.Provider value={{auth, firestore}}>
      <AuthContext>
        <App />
      </AuthContext>
    </FirebaseContext.Provider>
  </StrictMode>
);
