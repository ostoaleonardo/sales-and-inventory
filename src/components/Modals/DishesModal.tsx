import { useEffect, useState } from 'react'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Selection } from '@nextui-org/react'
import { useTables } from '@/hooks'
import { TABLES } from '@/constants'
import { Categories } from '@/types'

type Props = {
    id?: number
    isOpen: boolean
    onOpenChange: (value: boolean) => void
}

export function DishesModal({ id, isOpen, onOpenChange }: Props) {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [allCategories, setAllCategories] = useState<Categories[]>([])
    const [categories, setCategories] = useState<Selection>(new Set([]))
    const { getAllRows, getRowById, insertRow, updateRow } = useTables()

    useEffect(() => {
        return () => {
            setName('')
            setPrice('')
            setCategories(new Set([]))
        }
    }, [])

    useEffect(() => {
        (async () => {
            const categories = await getAllRows('categories') as Categories[]
            setAllCategories(categories)

            if (id) {
                const { name, price, categories } = await getRowById(TABLES.DISHES, id)
                setName(name)
                setPrice(price)
                setCategories(new Set([categories]))
            }
        })()

        return () => {
            setName('')
            setPrice('')
            setCategories(new Set([]))
        }
    }, [id])

    const handleSave = async () => {
        const values = {
            name,
            price,
            categories: Array.from(categories)[0]
        }

        if (id) {
            await updateRow(TABLES.DISHES, id, values)
        } else {
            await insertRow(TABLES.DISHES, values)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className='flex flex-col gap-1'>
                            {id ? 'Editar platillo' : 'Nuevo platillo'}
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                label='Nombre'
                                placeholder='Nombre del platillo'
                                value={name}
                                onValueChange={setName}
                            />
                            <Input
                                label='Precio'
                                type='number'
                                placeholder='0'
                                value={price}
                                onValueChange={setPrice}
                            />
                            <Select
                                label='Categoría'
                                placeholder='Categoría del platillo'
                                items={allCategories}
                                selectedKeys={categories}
                                onSelectionChange={setCategories}
                            >
                                {(category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                )}
                            </Select>
                        </ModalBody>
                        <ModalFooter>
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
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
