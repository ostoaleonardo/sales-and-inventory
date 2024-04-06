import { Home, Restaurant, Bowl, Box, Filter } from '@/icons'

export const NAVIGATION_ROUTES = [
    {
        path: '/home',
        name: 'Inicio',
        icon: Home({ className: 'w-4 h-4' }),
    },
    {
        path: '/sell',
        name: 'Vender',
        icon: Restaurant({ className: 'w-4 h-4' }),
    },
    {
        path: '/dishes',
        name: 'Platillos',
        icon: Bowl({ className: 'w-4 h-4' }),
    },
    {
        path: '/categories',
        name: 'Categorías',
        icon: Filter({ className: 'w-4 h-4' }),
    },
    {
        path: '/inventory',
        name: 'Inventario',
        icon: Box({ className: 'w-4 h-4' }),
    },
]
