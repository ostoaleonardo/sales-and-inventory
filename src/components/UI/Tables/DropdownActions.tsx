import { useCallback } from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { useAuth } from '@/hooks'
import { DeleteBin, More, Pencil } from '@/icons'
import { ROLES } from '@/constants'

type Props = {
    onEdit: () => void
    onDelete: () => void
}

export function DropdownActions({ onEdit, onDelete }: Props) {
    const { user } = useAuth()
    const { role } = user

    const disabledKeys = useCallback(() => {
        if (role === ROLES.ADMIN) return []

        return ['delete']
    }, [role])

    const dropdownActions = [
        { key: 'edit', action: onEdit },
        { key: 'delete', action: onDelete }
    ]

    return (
        <Dropdown shadow='sm'>
            <DropdownTrigger>
                <Button isIconOnly size='sm' variant='light'>
                    <More className='w-4 h-4' />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label='Actions'
                disabledKeys={disabledKeys()}
                onAction={(key) => {
                    const item = dropdownActions.find((item) => item.key === key)
                    if (item) item.action()
                }}
            >
                <DropdownItem
                    key='edit'
                    description='Actualizar información'
                    startContent={<Pencil className='w-4 h-4 mx-1' />}
                >
                    Editar
                </DropdownItem>
                <DropdownItem
                    key='delete'
                    color='danger'
                    description={
                        role === ROLES.ADMIN
                            ? 'Eliminar permanentemente'
                            : 'No tienes permisos para eliminar'
                    }
                    startContent={<DeleteBin className='w-4 h-4 mx-1' />}
                >
                    Eliminar
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
