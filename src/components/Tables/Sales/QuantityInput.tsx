import { useEffect, useState } from 'react'
import { Input } from '@nextui-org/react'

type Props = {
    id: string
    value: string
    updateQuantity: (id: string, quantity: number) => void
}

export function QuantityInput({ id, value, updateQuantity }: Props) {
    const [quantity, setQuantity] = useState(value)

    useEffect(() => {
        setQuantity(value)
    }, [value])

    useEffect(() => {
        updateQuantity(id, parseInt(quantity))
    }, [quantity])

    return (
        <Input
            min={1}
            type='number'
            value={quantity}
            onValueChange={setQuantity}
            className='w-20'
        />
    )
}
