import { useState } from 'react'
import { Link as Linking, useLocation } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from '@nextui-org/react'
import { Typography } from '../Text'
import { Menu } from '@/icons'
import { NAVIGATION_ROUTES } from '@/constants'

export function Nav() {
    const { pathname } = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <Navbar
            maxWidth='2xl'
            isBlurred={false}
            className='bg-zinc-900'
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    icon={<Menu className='w-4 h-4' />}
                    className='sm:hidden'
                />
                <NavbarBrand>
                    <Typography>
                        {NAVIGATION_ROUTES.find(route => route.path === pathname)?.name}
                    </Typography>
                </NavbarBrand>
            </NavbarContent>

            <NavbarMenu className='bg-zinc-900 overflow-y-hidden'>
                {NAVIGATION_ROUTES.map((item, index) => (
                    <NavbarMenuItem key={index}>
                        <Link
                            isBlock
                            as={Linking}
                            to={item.path}
                            color='foreground'
                            className='w-full px-4 py-4'
                        >
                            <span className='flex items-center gap-4'>
                                {item.icon}
                                {item.name}
                            </span>
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}
