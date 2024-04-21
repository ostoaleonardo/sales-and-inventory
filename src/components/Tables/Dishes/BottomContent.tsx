import { Button } from '@nextui-org/react'

type Props = {
    fromRow: number
    toRow: number
    totalRows: number
    onPreviousPage: () => void
    onNextPage: () => void
}

export function BottomContent({ fromRow, toRow, totalRows, onPreviousPage, onNextPage }: Props) {
    return (
        <footer className='flex items-center justify-between'>
            <span className='text-sm text-default-400'>
                {toRow === -1
                    ? 'Mostrando todas las filas'
                    : `Mostrando ${fromRow + 1} - ${toRow + 1} de ${totalRows}`
                }
            </span>
            <div className='space-x-2'>
                <Button
                    size='sm'
                    variant='flat'
                    onPress={onPreviousPage}
                    isDisabled={fromRow === 0}
                >
                    Anterior
                </Button>
                <Button
                    size='sm'
                    variant='flat'
                    onPress={onNextPage}
                    isDisabled={toRow === -1 || toRow >= totalRows - 1}
                >
                    Siguiente
                </Button>
            </div>
        </footer>
    )
}
