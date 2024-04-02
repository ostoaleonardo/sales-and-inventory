import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home, Login } from './pages'
import { supabase } from './database'

function App() {
    const navigate = useNavigate()

    useEffect(() => {
        supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN') {
                navigate('/home')
            } else if (event === 'SIGNED_OUT') {
                navigate('/')
            }
        })
    }, [])

    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='*' element={<Login />} />
        </Routes>
    )
}

export default App
