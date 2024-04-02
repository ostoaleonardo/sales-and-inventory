import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'

type Props = {
    children: React.ReactNode
}

export default function Providers({ children }: Props) {
    return (
        <BrowserRouter>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </BrowserRouter>
    )
}
