import { useContext, useEffect } from 'react'
import { AuthContext } from '@/context'
import { supabase } from '@/database'
import { jwtDecode } from 'jwt-decode'

export function useAuth() {
    const { session, setSession, user, setUser } = useContext(AuthContext)

    const signUp = async (email: string, password: string) => {
        let { data, error } = await supabase.auth.signUp({
            email,
            password
        })

        return { data, error }
    }

    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (!error) {
            setSession(data)
        }

        return { data, error }
    }

    const logOut = async () => {
        let { error } = await supabase.auth.signOut()

        return error
    }

    const initializeUser = async (user: any) => {
        const { id, email, role } = user

        setUser({
            id,
            email,
            role
        })
    }

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                const {
                    access_token,
                    refresh_token,
                    expires_at,
                    expires_in,
                    token_type,
                    user
                } = session

                setSession({
                    access_token,
                    refresh_token,
                    expires_at,
                    expires_in,
                    token_type,
                })

                const { user_role } = jwtDecode(access_token) as any

                initializeUser({
                    ...user,
                    role: user_role
                })
            }
        })
    }, [])

    return {
        session,
        user,
        signUp,
        signIn,
        logOut
    }
}
