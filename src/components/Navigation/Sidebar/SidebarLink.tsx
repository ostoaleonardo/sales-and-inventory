import { Link as Linking } from 'react-router-dom'
import { Link, Tooltip } from '@nextui-org/react'

type Props = {
    href: string
    isActive?: boolean
    icon?: React.ReactNode
    children: React.ReactNode
}

export function SidebarLink({ href, isActive, icon, children }: Props) {
    const baseClass = 'flex items-center max-xl:justify-center rounded-xl px-8 py-4'
    const activeClass = isActive && 'bg-primary/20'

    return (
        <Tooltip
            content={children}
            className='xl:hidden'
        >
            <Link
                isBlock
                to={href}
                as={Linking}
                color={isActive ? 'primary' : 'foreground'}
                className={`${baseClass} ${activeClass}`}
            >
                {isActive && <div className='absolute left-0 w-1 h-3 bg-primary rounded-xl' />}

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
