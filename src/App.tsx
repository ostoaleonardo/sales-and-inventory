import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Login, Home, Sell, Dishes, Categories, Inventory } from './pages'
import { Sidebar, Nav } from './components'
import { supabase } from './database'

function App() {
    const navigate = useNavigate()

    useEffect(() => {
        supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN') {
                // navigate('/home')
            } else if (event === 'SIGNED_OUT') {
                navigate('/')
            }
        })
    }, [])

    return (
        <>
            <main className='w-full min-h-screen inline-flex'>
                <Sidebar />
                <section className='w-full flex flex-col'>
                    <Nav />
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/sell' element={<Sell />} />
                        <Route path='/dishes' element={<Dishes />} />
                        <Route path='/categories' element={<Categories />} />
                        <Route path='/inventory' element={<Inventory />} />
                        <Route path='*' element={<Login />} />
                    </Routes>
                </section>
            </main>
        </>
    )
}

export default App
