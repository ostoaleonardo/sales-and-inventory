import { Link } from '@nextui-org/react'
import { Link as Linking } from 'react-router-dom'

type Props = {
    href: string
    icon?: React.ReactNode
    children: React.ReactNode
}

export function AsideLink({ href, icon, children }: Props) {
    return (
        <Link
            isBlock
            to={href}
            as={Linking}
            color='foreground'
            className='w-full flex items-center justisfy-center px-8 py-4'
        >
            <div className='mr-4'>
                {icon}
            </div>
            {children}
        </Link>
    )
}
