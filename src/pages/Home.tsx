import { DashboardCard } from '@/components'
import { Restaurant, Box, Cash, Bowl } from '@/icons'

export function Home() {
    return (
        <main className='w-full h-full flex p-8'>
            <div className='w-full h-max grid grid-cols-2 md:grid-cols-4 gap-4'>
                <DashboardCard
                    title='Ventas'
                    number='100'
                    icon={Restaurant({ className: 'w-4 h-4' })}
                    footer='Total de ventas'
                />
                <DashboardCard
                    title='Ganancias'
                    number='$1,000'
                    icon={Box({ className: 'w-4 h-4' })}
                    footer='Total de ganancias'
                />
                <DashboardCard
                    title='Efectivo'
                    number='$500'
                    icon={Cash({ className: 'w-4 h-4' })}
                    footer='Efectivo en caja'
                />
                <DashboardCard
                    title='Platillos'
                    number='200'
                    icon={Bowl({ className: 'w-4 h-4' })}
                    footer='Total de platillos'
                />
            </div>
        </main>
    )
}
