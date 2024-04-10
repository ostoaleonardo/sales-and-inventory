import { useContext, useEffect } from 'react'
import { AuthContext } from '@/context'
import { supabase } from '@/database'

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
        supabase.auth.getSession().then(({ data }) => {
            const { session } = data
            const { user } = session || {}

            if (user) {
                setSession(session)
                initializeUser(user)
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
