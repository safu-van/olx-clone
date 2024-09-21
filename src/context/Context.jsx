import { createContext, useState } from "react";

export const FirebaseContext = createContext(null)
export const AuthenticationContext = createContext(null)

export function AuthContext({ children }) {
    const [user, setUser] = useState(null)

    return (
        <AuthenticationContext.Provider value={{user, setUser}}>
            {children}
        </AuthenticationContext.Provider>
    )
}