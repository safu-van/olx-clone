import { createContext, useState } from "react";
import { auth, firestore, storage } from "../firebase/config"

export const FirebaseContext = createContext(null)

export function Context({children}) {
    const [user, setUser] = useState(null)
    const ContextValues = {
        user,
        setUser,
        auth,
        firestore,
        storage,
    }

    return (
        <FirebaseContext.Provider value={ContextValues}>
            {children}
        </FirebaseContext.Provider>
    )
}