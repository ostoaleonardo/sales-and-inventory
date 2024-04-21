import { useState } from 'react'
import { useDisclosure } from '@nextui-org/react'
import { CategoriesModal, CategoriesTable } from '@/components'

export function Categories() {
    const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const onAdd = () => {
        setSelectedCategory(undefined)
        onOpen()
    }

    const onEdit = (id: number) => {
        setSelectedCategory(id)
        onOpen()
    }

    return (
        <main className='w-full h-full flex px-6 py-8'>
            <CategoriesTable
                onAdd={onAdd}
                onEdit={onEdit}
            />

            <CategoriesModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                id={selectedCategory}
            />
        </main>
    )
}
