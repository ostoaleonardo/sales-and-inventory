import { SidebarHeader, SidebarLink } from '.'
import { NAVIGATION_ROUTES } from '@/constants'

export function Sidebar() {
    return (
        <aside className='w-20 xl:w-80 hidden sm:flex flex-col bg-zinc-950 gap-4 transition-width'>
            <SidebarHeader />
            <div className='flex flex-col gap-2 px-2'>
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
        </aside>
    )
}
