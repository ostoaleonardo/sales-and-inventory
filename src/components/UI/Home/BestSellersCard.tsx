import { Card, CardBody, CardHeader, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { Bowl } from '@/icons'

type Props = {
    bestSellers: any[]
    isLoading?: boolean
}

const COLUMNS = [
    { key: 'name', label: 'NOMBRE' },
    { key: 'price', label: 'PRECIO' },
    { key: 'quantity', label: 'VENDIDOS' },
    { key: 'total', label: 'TOTAL' }
]

export function BestSellersTable({ bestSellers }: Props) {
    return (
        <Table
            aria-label='Best sellers table'
            className='h-full'
            removeWrapper
            classNames={{
                th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
                td: [
                    'group-hover:scale-110 transition-transform',
                    'group-hover:bg-primary-50 group-hover:text-primary',
                    'first:rounded-l-lg',
                    'last:rounded-r-lg',
                    'py-3'
                ]
            }}
        >
            <TableHeader columns={COLUMNS}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody
                items={bestSellers}
                emptyContent='No hay datos'
            >
                {(item: any) => (
                    <TableRow key={item.name}>
                        {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </ Table>
    )
}

export function BestSellersCard({ bestSellers, isLoading }: Props) {
    return (
        <Card shadow='sm' className='col-span-2 bg-zinc-950/60 p-4 pb-0'>
            <CardHeader className='items-start justify-between'>
                <h4 className='text-lg font-semibold'>
                    Mas vendidos
                </h4>
                <div className='flex items-center justify-center text-primary bg-primary/10 rounded-2xl p-3 sm:p-4'>
                    <Bowl className='w-4 h-4' />
                </div>
            </CardHeader>
            <CardBody className='w-full flex flex-row items-center justify-between pb-8'>
                {isLoading
                    ? <Spinner className='w-full' />
                    : <BestSellersTable bestSellers={bestSellers} />
                }
            </CardBody>
        </Card>
    )
}
