import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { BestSellersCard, Calendar, DashboardCard, SalesOfLastWeekCard } from '@/components'
import { Restaurant, Box, Cash, Bowl, Loop } from '@/icons'
import { useTables } from '@/hooks'
import { emptyDateRange, getBestSeller, getDaysOfLastWeek } from '@/utils'
import { Sale } from '@/types'
import { TABLES } from '@/constants'

const COLUMN = 'created_at'
const RELATIONSHIP = 'dishes(name,price)'

export function Home() {
    const { getAllRows, getAllRowsByDateRange, countRows, countRowsByDateRange } = useTables()
    const [salesCount, setSalesCount] = useState(0)
    const [dishesCount, setDishesCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [bestSellers, setBestSellers] = useState<any[]>([])
    const [salesLastWeek, setSalesLastWeek] = useState<any>([])

    // Date filter
    const [dateFilter, setDateFilter] = useState<any>(emptyDateRange)

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            let count = 0
            let bestSellers = []

            if (dateFilter.start && dateFilter.end) {
                const salesCount = await countRowsByDateRange(
                    TABLES.SALES,
                    COLUMN,
                    dateFilter.start,
                    dateFilter.end
                )

                const sales = await getAllRowsByDateRange(
                    TABLES.SALES_ITEMS,
                    'sales.created_at',
                    dateFilter.start,
                    dateFilter.end,
                    'sales!inner(created_at),dishes(name,price)'
                )

                count = salesCount
                bestSellers = getBestSeller(sales)
            } else {
                const salesCount = await countRows(TABLES.SALES)
                const sales = await getAllRows(TABLES.SALES_ITEMS, RELATIONSHIP) as Sale[]

                count = salesCount
                bestSellers = getBestSeller(sales)
            }

            setSalesCount(count)
            setBestSellers(bestSellers)
            setIsLoading(false)
        })()
    }, [dateFilter])

    useEffect(() => {
        (async () => {
            const dishes = await countRows(TABLES.DISHES)
            setDishesCount(dishes)

            const daysOfWeek = getDaysOfLastWeek()

            // Get sales count for each day of the week
            const salesCounts = await Promise.all(
                daysOfWeek.map(async (day) => {
                    const nextDay = new Date(day.dayISO)
                    nextDay.setDate(nextDay.getDate() + 1)

                    const count = await countRowsByDateRange(
                        TABLES.SALES,
                        COLUMN,
                        day.dayISO,
                        nextDay.toISOString()
                    )

                    return count
                })
            )

            // Get the day with the most sales
            const maxSales = Math.max(...salesCounts)
            const salesLastWeek = salesCounts.map((count: number, index: number) => ({
                day: daysOfWeek[index].dayName,
                count: count,
                percentage: (count / maxSales) * 100
            }))

            setSalesLastWeek(salesLastWeek)
        })()
    }, [])

    return (
        <main className='w-full h-full flex flex-col px-6 pb-8 gap-4'>
            <header className='w-full flex flex-row items-start justify-end gap-2'>
                <Button
                    isIconOnly
                    variant='flat'
                    aria-label='Limpiar filtro de fecha'
                    onPress={() => setDateFilter(emptyDateRange)}
                >
                    <Loop className='w-4 h-4' />
                </Button>
                <Calendar
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                />
            </header>

            <div className='w-full grid grid-cols-2 lg:grid-cols-4 gap-4'>
                <DashboardCard
                    title='Total de ganancias'
                    number='$1,000'
                    icon={Box({ className: 'w-4 h-4' })}
                />
                <DashboardCard
                    title='Efectivo en caja'
                    number='$500'
                    icon={Cash({ className: 'w-4 h-4' })}
                />
                <DashboardCard
                    title='Total de ventas'
                    number={salesCount}
                    isLoading={isLoading}
                    icon={Restaurant({ className: 'w-4 h-4' })}
                />
                <DashboardCard
                    title='Total de platillos'
                    number={dishesCount}
                    isLoading={isLoading}
                    icon={Bowl({ className: 'w-4 h-4' })}
                />
            </div>

            <div className='w-full h-full grid grid-cols-2 lg:grid-cols-4 gap-4'>
                <BestSellersCard
                    isLoading={isLoading}
                    bestSellers={bestSellers}
                />
                <SalesOfLastWeekCard
                    salesLastWeek={salesLastWeek}
                />
            </div>
        </main>
    )
}
