import { createContext, useState } from 'react'

export const AuthContext = createContext({} as any)

type Props = {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: Props) => {
    const [session, setSession] = useState(null)
    const [user, setUser] = useState(null)

    return (
        <AuthContext.Provider
            value={{
                session,
                setSession,
                user,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
