import { Card, CardBody, CardHeader, Spinner } from '@nextui-org/react'
import { BarGraph } from './BarGraph'
import { Restaurant } from '@/icons'

type Props = {
    salesLastWeek: any[]
}

export function SalesOfLastWeekCard({ salesLastWeek }: Props) {
    const isLoaded = salesLastWeek.length > 0

    return (
        <Card shadow='sm' className='min-h-96 col-span-2 bg-zinc-950/60 p-4 pb-0'>
            <CardHeader className='items-start justify-between'>
                <h4 className='text-lg font-semibold'>
                    Ventas de la última semana
                </h4>
                <div className='flex items-center justify-center text-primary bg-primary/10 rounded-2xl p-3 sm:p-4'>
                    <Restaurant className='w-4 h-4' />
                </div>
            </CardHeader>
            <CardBody className='w-full flex flex-row items-center justify-between py-8'>
                {!isLoaded
                    ? <Spinner className='w-full' />
                    : salesLastWeek.map((sale: any, index: number) => (
                        <BarGraph
                            key={index}
                            label={sale.day}
                            count={sale.count}
                            value={sale.percentage}
                        />
                    ))
                }
            </CardBody>
        </Card>
    )
}
