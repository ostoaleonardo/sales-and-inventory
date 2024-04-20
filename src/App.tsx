import { Route, Routes } from 'react-router-dom'
import { Login, Home, Sales, Dishes, Categories, Inventory } from './pages'
import { Sidebar, Nav } from './components'
import { useAuth } from './hooks'

function App() {
    const { session } = useAuth()

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
                        <Route path='*' element={<Home />} />
                    </Routes>
                </section>
            </main>
        </>
    )
}

export default App
