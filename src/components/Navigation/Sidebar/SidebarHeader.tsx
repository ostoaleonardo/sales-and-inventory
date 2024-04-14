import { User } from '@nextui-org/react'
import { useAuth } from '@/hooks'

export function SidebarHeader() {
    const { user } = useAuth()

    return (
        <header className='w-full flex items-center max-xl:justify-center border-b-1 border-white/10 px-6 py-5'>
            <User
                name={user?.email}
                description={user?.role}
                classNames={{
                    base: 'gap-3',
                    wrapper: 'max-xl:hidden',
                    description: 'capitalize'
                }}
                avatarProps={{
                    size: 'sm',
                    isBordered: true,
                    name: user?.email[0],
                    className: 'uppercase'
                }}
            />
        </header>
    )
}
