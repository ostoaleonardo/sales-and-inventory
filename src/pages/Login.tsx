import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, CardFooter, CardHeader, Input, Button } from '@nextui-org/react'
import { Typography } from '@/components'
import { Eye, EyeClose } from '@/icons'
import { useAuth } from '@/hooks'

type Props = {
    visible: boolean
    onPress: () => void
}

function PasswordToggle({ visible, onPress }: Props) {
    return (
        <Button
            size='sm'
            isIconOnly
            variant='light'
            onPress={onPress}
        >
            {visible
                ? <Eye className='w-4 h-4' />
                : <EyeClose className='w-4 h-4 opacity-50' />
            }
        </Button>
    )

}

export function Login() {
    const navigate = useNavigate()
    const { session, signIn } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (session) {
            navigate('/home')
        }
    }, [session])

    const handleLogin = async () => {
        const { error } = await signIn(email, password)

        if (!error) {
            navigate('/home')
        }
    }

    return (
        <main className='w-full h-full flex items-center justify-center'>
            <Card
                shadow='sm'
                className='min-w-96 p-2'
            >
                <CardHeader className='flex gap-3'>
                    <Typography>
                        Iniciar sesión
                    </Typography>
                </CardHeader>
                <CardBody className='space-y-4'>
                    <Input
                        type='email'
                        label='Correo electrónico'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label='Contraseña'
                        type={visible ? 'text' : 'password'}
                        endContent={
                            <PasswordToggle
                                visible={visible}
                                onPress={() => setVisible(!visible)}
                            />
                        }
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
