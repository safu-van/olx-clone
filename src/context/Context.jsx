import { createContext, useEffect, useState } from "react";
import { auth, firestore, storage } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export const FirebaseContext = createContext(null);

export function Context({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, [auth]);

  const ContextValues = {
    user,
    loading,
    auth,
    firestore,
    storage,
  };

  return (
    <FirebaseContext.Provider value={ContextValues}>
      {children}
    </FirebaseContext.Provider>
  );
}
