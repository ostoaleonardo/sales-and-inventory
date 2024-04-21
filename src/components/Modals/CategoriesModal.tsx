import { useEffect, useState } from 'react'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { useTables } from '@/hooks'
import { TABLES } from '@/constants'

type Props = {
    id?: number
    isOpen: boolean
    onOpenChange: (value: boolean) => void
}

export function CategoriesModal({ id, isOpen, onOpenChange }: Props) {
    const [name, setName] = useState('')
    const { getRowById, insertRow, updateRow } = useTables()

    useEffect(() => {
        return () => {
            setName('')
        }
    }, [])

    useEffect(() => {
        if (id) {
            (async () => {
                const { name } = await getRowById(TABLES.CATEGORIES, id)
                setName(name)
            })()
        }

        return () => {
            setName('')
        }
    }, [id])

    const handleSave = async () => {
        const values = {
            name
        }

        if (id) {
            await updateRow(TABLES.CATEGORIES, id, values)
        } else {
            await insertRow(TABLES.CATEGORIES, values)
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
                            {id ? 'Editar categoría' : 'Nueva categoría'}
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                label='Nombre'
                                placeholder='Nombre de la categoría'
                                value={name}
                                onValueChange={setName}
                            />
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
