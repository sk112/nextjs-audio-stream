
import React, { createContext, ReactNode, useContext } from "react";
import { contextType } from "../../types/types";
import useFirebaseAuth from "./auth";


const AuthUserContext = createContext<contextType | null>({
    author: null,
    loading: true
})

export function AuthUserProvider({ children }: { children: React.ReactNode}) {
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