import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import { AuthProvider } from './context/authContext'

type Props = {
    children: React.ReactNode
}

export default function Providers({ children }: Props) {
    return (
        <AuthProvider>
            <BrowserRouter>
                <NextUIProvider>
                    {children}
                </NextUIProvider>
            </BrowserRouter>
        </AuthProvider>
    )
}
