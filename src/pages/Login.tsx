import { useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader, Input, Button } from '@nextui-org/react'
import { supabase } from '@/database'

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        console.log(data, error)
    }

    return (
        <main className='w-full h-screen flex items-center justify-center'>
            <Card
                shadow='sm'
                className='min-w-96 p-2'
            >
                <CardHeader className='flex gap-3'>
                    <div className='flex flex-col'>
                        <p className='font-medium text-3xl'>Login</p>
                    </div>
                </CardHeader>
                <CardBody className='space-y-4'>
                    <Input
                        type='email'
                        label='Correo electrónico'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type='password'
                        label='Contraseña'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </CardBody>
                <CardFooter>
                    <Button
                        color='primary'
                        className='w-full'
                        onPress={handleLogin}
                    >
                        Iniciar sesión
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}
