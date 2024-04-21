import { Key, useEffect, useState } from 'react'
import { Autocomplete, AutocompleteItem, Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { Paragraph } from '../Text'
import { CartTable } from '../Tables'
import { useAuth, useTables } from '@/hooks'
import { Dish } from '@/types'
import { TABLES } from '@/constants'

type Props = {
    id?: number
    isOpen: boolean
    onOpenChange: (value: boolean) => void
}

export function SalesModal({ id, isOpen, onOpenChange }: Props) {
    const { user } = useAuth()
    const { getAllRows, getRowById, getRowsByColumn, insertRow, updateRow, upsertRow } = useTables();

    // Cart
    const [sale, setSale] = useState<any[]>([])
    const [saleItems, setSaleItems] = useState<any[]>([])
    const [cart, setCart] = useState<any[]>([])

    const [dishes, setDishes] = useState<any[]>([])
    const [selected, setSelected] = useState<Key | any>(null)

    const onAdd = () => {
        if (selected) {
            const item = dishes.find((item) => item.id === selected)

            if (item) {
                const existingItem = cart.find((item) => item.id === selected)

                if (existingItem) {
                    const updatedCart = cart.map((item) => {
                        if (item.id === existingItem.id) {
                            return {
                                ...item,
                                quantity: item.quantity + 1,
                            }
                        }

                        return item
                    })

                    setCart(updatedCart)
                } else {
                    const newItem = {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: 1,
                    }

                    setCart([...cart, newItem])
                }

            }
        }
    }

    const onRemove = (id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        setCart((prevCart) => prevCart.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity,
                }
            }

            return item
        }))
    }

    useEffect(() => {
        (async () => {
            const dishes = await getAllRows(TABLES.DISHES) as Dish[]
            setDishes(dishes)

            if (id) {
                const sale = await getRowById(TABLES.SALES, id)
                setSale(sale)

                const saleItems = await getRowsByColumn(
                    TABLES.SALES_ITEMS,
                    'sale_id',
                    id,
                    'dishes(id,name,price)'
                )

                const items = saleItems.map((item: any) => ({
                    id: item.id,
                    sale_id: item.sale_id,
                    item_id: item.item_id,
                    quantity: item.quantity,
                    created_at: item.created_at
                }))

                setSaleItems(items)

                const cart = saleItems.map((item: any) => ({
                    id: item.item_id,
                    name: item.dishes.name,
                    price: item.dishes.price,
                    quantity: item.quantity,
                }))

                setCart(cart)
            }
        })()

        return () => {
            setSale([])
            setSaleItems([])
            setCart([])
        }
    }, [id])

    const handleSave = async () => {
        let saleId = ''

        const saleValues = {
            total: 0,
            seller: user.id,
        }

        if (id) {
            await updateRow(TABLES.SALES, id, saleValues)
        } else {
            const data = await insertRow(TABLES.SALES, saleValues) as any[]
            saleId = data[0].id
        }

        if (id) {
            const updateItems = cart.map((item) => {
                const saleItem = saleItems.find((saleItem) => saleItem.item_id === item.id)

                if (saleItem) {
                    return {
                        id: saleItem.id,
                        sale_id: saleItem.sale_id,
                        item_id: saleItem.item_id,
                        quantity: item.quantity,
                    }
                } else {
                    return {
                        sale_id: id,
                        item_id: item.id,
                        quantity: item.quantity,
                    }
                }
            })

            await upsertRow(TABLES.SALES_ITEMS, updateItems)
        } else {
            const saleItems = cart.map((item) => ({
                sale_id: saleId,
                item_id: item.id,
                quantity: item.quantity,
            }))

            await insertRow(TABLES.SALES_ITEMS, saleItems)
        }
    }

    return (
        <Modal
            size='4xl'
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className='flex flex-col gap-1'>
                            {id ? 'Editar' : 'Nueva'} venta
                        </ModalHeader>
                        <ModalBody>
                            <div className='flex flex-row items-center justify-between gap-2 my-2'>
                                <Autocomplete
                                    defaultItems={dishes}
                                    placeholder='Selecciona un platillo'
                                    selectedKey={selected}
                                    onSelectionChange={setSelected}
                                    classNames={{
                                        listboxWrapper: 'max-h-[320px]',
                                    }}
                                >
                                    {(category) => (
                                        <AutocompleteItem
                                            key={category.id}
                                            value={category.id}
                                            endContent={
                                                <Chip variant='bordered'>
                                                    ${category.price}
                                                </Chip>
                                            }
                                        >
                                            {category.name}
                                        </AutocompleteItem>
                                    )}
                                </Autocomplete>
                                <Button
                                    variant='flat'
                                    color='primary'
                                    onPress={onAdd}
                                >
                                    Agregar
                                </Button>
                            </div>

                            <CartTable
                                cart={cart}
                                onRemove={onRemove}
                                updateQuantity={updateQuantity}
                            />
                        </ModalBody>
                        <ModalFooter className='items-center justify-between gap-2'>
                            <div className='flex flex-row gap-2'>
                                <Paragraph>
                                    Total:
                                </Paragraph>
                                <Paragraph>
                                    ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                                </Paragraph>
                            </div>

                            <div className='flex flex-row gap-2'>
                                <Button onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button
                                    color='primary'
                                    onPress={() => {
                                        handleSave()
                                        onClose()
                                    }}
                                >
                                    Guardar
                                </Button>
                            </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
