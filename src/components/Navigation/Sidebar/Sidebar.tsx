import { Button } from '@nextui-org/react'
import { SidebarHeader, SidebarLink } from '.'
import { useAuth } from '@/hooks'
import { LogOut } from '@/icons'
import { NAVIGATION_ROUTES } from '@/constants'

export function Sidebar() {
    const { logOut } = useAuth()

    return (
        <aside className='w-20 xl:w-80 hidden sm:flex flex-col bg-zinc-950 gap-4 transition-width'>
            <SidebarHeader />
            <div className='h-[85%] flex flex-col justify-between px-2'>
                <div className='flex flex-col gap-2'>
                    {NAVIGATION_ROUTES.map((route, index) => (
                        <SidebarLink
                            key={index}
                            href={route.path}
                            icon={route.icon}
                        >
                            {route.name}
                        </SidebarLink>
                    ))}
                </div>

                <Button
                    size='lg'
                    isIconOnly
                    variant='light'
                    onPress={logOut}
                    className='w-full h-14 flex xl:hidden'
                >
                    <LogOut className='w-4 h-4' />
                </Button>
                <Button
                    size='lg'
                    variant='light'
                    onPress={logOut}
                    className='h-14 justify-start hidden xl:flex'
                    startContent={<LogOut className='w-4 h-4' />}
                >
                    Cerrar sesión
                </Button>
            </div>
        </aside>
    )
}
