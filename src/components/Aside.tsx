import { AsideHeader, AsideLink } from '.'
import { Home as HomeIcon, Restaurant, Box } from '@/icons'

export function Aside() {
    return (
        <aside className='w-64 h-screen flex flex-col bg-zinc-950 text-white gap-4'>
            <AsideHeader />
            <div className='flex flex-col gap-2 px-2'>
                <AsideLink
                    href='/home'
                    icon={<HomeIcon className='w-4 h-4' />}
                >
                    Inicio
                </AsideLink>
                <AsideLink
                    href='/sell'
                    icon={<Restaurant className='w-4 h-4' />}
                >
                    Vender
                </AsideLink>
                <AsideLink
                    href='/inventory'
                    icon={<Box className='w-4 h-4' />}
                >
                    Inventario
                </AsideLink>
            </div>
        </aside>
    )
}
