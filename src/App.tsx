import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Login, Home, Sales, Dishes, Categories, Inventory } from './pages'
import { Sidebar, Nav } from './components'
import { useAuth } from './hooks'

function App() {
    const { session } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (session) {
            navigate('/home')
        } else {
            navigate('/')
        }
    }, [session, navigate])

    return (
        <>
            <main className='w-full min-h-screen inline-flex'>
                {session && <Sidebar />}
                <section className='w-full flex flex-col'>
                    <Nav />
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/sales' element={<Sales />} />
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
