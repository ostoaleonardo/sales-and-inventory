import { useState } from 'react'
import { useDisclosure } from '@nextui-org/react'
import { DishesTable, DishesModal } from '@/components'

export function Dishes() {
    const [selectedDish, setSelectedDish] = useState<number | undefined>(undefined)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const onAdd = () => {
        setSelectedDish(undefined)
        onOpen()
    }

    const onEdit = (id: number) => {
        setSelectedDish(id)
        onOpen()
    }

    return (
        <div className='w-full h-full flex px-6 py-8'>
            <DishesTable
                onAdd={onAdd}
                onEdit={onEdit}
            />

            <DishesModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                id={selectedDish}
            />
        </div>
    )
}
