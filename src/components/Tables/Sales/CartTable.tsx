import { useCallback } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Button } from '@nextui-org/react'
import { QuantityInput } from './QuantityInput'
import { Paragraph } from '@/components'
import { CART_COLUMNS } from '@/constants'

type Props = {
    cart: any[]
    onRemove: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
}

export function CartTable({ cart, onRemove, updateQuantity }: Props) {
    const renderCell = useCallback((item: any, columnKey: string) => {
        switch (columnKey) {
            case 'id':
                return (
                    <Paragraph>{item.id.split('-')[0]}</Paragraph>
                )
            case 'item':
                return (
                    <Paragraph>{item.name}</Paragraph>
                )
            case 'quantity':
                return (
                    <QuantityInput
                        id={item.id}
                        value={item.quantity}
                        updateQuantity={updateQuantity}
                    />
                )
            case 'price':
                return (
                    <Paragraph>{item.price}</Paragraph>
                )
            case 'subtotal':
                return (
                    <Paragraph>{item.price * item.quantity}</Paragraph>
                )
            case 'actions':
                return (
                    <Button
                        size='sm'
                        variant='flat'
                        color='danger'
                        onPress={() => onRemove(item.id)}
                    >
                        Eliminar
                    </Button>
                )
            default:
                return null
        }
    }, [cart])

    return (
        <Table
            shadow='none'
            aria-label='Dishes Table'
            isHeaderSticky
            classNames={{
                base: 'justify-between',
                wrapper: 'h-[400px]',
            }}
            topContentPlacement='outside'
            bottomContentPlacement='outside'
        >
            <TableHeader columns={CART_COLUMNS}>
                {(column) => (
                    <TableColumn key={column.uid}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                items={cart}
                loadingContent={<Spinner />}
                emptyContent='No hay elementos para mostrar'
            >
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => (
                            <TableCell>
                                {renderCell(item, columnKey as string)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
