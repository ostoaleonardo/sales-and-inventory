import { useState } from 'react'
import { useDisclosure } from '@nextui-org/react'
import { SalesTable, SalesModal } from '@/components'

export function Sales() {
    const [selectedSale, setSelectedSale] = useState<number | undefined>(undefined)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const onAdd = () => {
        setSelectedSale(undefined)
        onOpen()
    }

    const onEdit = (id: number) => {
        setSelectedSale(id)
        onOpen()
    }

    return (
        <div className='w-full h-full flex px-6 py-8'>
            <SalesTable
                onAdd={onAdd}
                onEdit={onEdit}
            />

            <SalesModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                id={selectedSale}
            />
        </div>
    )
}
