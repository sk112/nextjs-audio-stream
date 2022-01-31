
import React, { createContext, ReactNode, useContext } from "react";
import useFirebaseAuth from "./auth";


const AuthUserContext = createContext({
    author: null,
    loading: true,
    token: null,
    socket: null,
})

export function AuthUserProvider({ children }) {
    const auth = useFirebaseAuth()

    return (
        <AuthUserContext.Provider value= { auth } >
        { children }
        </AuthUserContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthUserContext)
}