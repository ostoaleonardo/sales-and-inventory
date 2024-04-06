import { Link as Linking } from 'react-router-dom'
import { Link, Tooltip } from '@nextui-org/react'

type Props = {
    href: string
    icon?: React.ReactNode
    children: React.ReactNode
}

export function SidebarLink({ href, icon, children }: Props) {
    return (
        <Tooltip
            content={children}
            className='xl:hidden'
        >
            <Link
                isBlock
                to={href}
                as={Linking}
                color='foreground'
                className='w-full flex items-center max-xl:justify-center px-8 py-4'
            >
                <div>
                    {icon}
                </div>
                <span className='hidden xl:block ml-4'>
                    {children}
                </span>
            </Link>
        </Tooltip>
    )
}
