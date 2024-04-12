import { useCallback } from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react'
import { Search, LayoutColumn, Add } from '@/icons'
import { CATEGORIES_COLUMNS, ROWS_PER_PAGE } from '@/constants'

type Props = {
    // Rows
    onAdd: () => void,
    totalRows: number,

    // Search
    filterValue: string,
    onValueChange: (value: string) => void,
    setFilterValue: (value: string) => void,

    // Show/Hide Columns
    visibleColumns: string[],
    setVisibleColumns: (value: any) => void,

    // Pagination
    rowsPerPage: string[],
    setRowsPerPage: (value: any) => void,
}

export function TopContent({
    // Rows
    onAdd,
    totalRows,

    // Search
    filterValue,
    onValueChange,
    setFilterValue,

    // Show/Hide Columns
    visibleColumns,
    setVisibleColumns,

    // Pagination
    rowsPerPage,
    setRowsPerPage
}: Props) {
    const rowsPerPageValue = Number(Array.from(rowsPerPage)[0])

    const onClear = useCallback(() => {
        setFilterValue('')
    }, [])

    return (
        <header className='flex flex-col gap-8'>
            <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                <Input
                    isClearable
                    onClear={onClear}
                    value={filterValue}
                    onValueChange={onValueChange}
                    placeholder='Buscar categoría'
                    className='w-full sm:max-w-[44%]'
                    startContent={<Search className='w-4 h-4' />}
                />
                <div className='flex self-end gap-3'>
                    <Dropdown>
                        <DropdownTrigger className='hidden sm:flex'>
                            <Button
                                isIconOnly
                                variant='flat'
                            >
                                <LayoutColumn className='w-4 h-4' />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label='Table Columns'
                            closeOnSelect={false}
                            selectionMode='multiple'
                            selectedKeys={visibleColumns}
                            onSelectionChange={setVisibleColumns}
                        >
                            {CATEGORIES_COLUMNS.map((column) => (
                                <DropdownItem key={column.uid} className='capitalize'>
                                    {column.name}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <Button
                        color='primary'
                        onPress={onAdd}
                        endContent={<Add className='w-4 h-4' />}
                    >
                        Agregar categoría
                    </Button>
                </div>
            </div>

            <div className='flex items-center justify-between'>
                <span className='text-default-400 text-small'>Total: {totalRows} elementos</span>
                <Dropdown>
                    <DropdownTrigger className='hidden sm:flex text-default-400'>
                        <Button
                            variant='light'
                            className='text-default-600'
                        >
                            Filas por página: {rowsPerPageValue === -1 ? 'Todas' : rowsPerPageValue}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        aria-label='Rows per Page'
                        selectionMode='single'
                        items={ROWS_PER_PAGE}
                        selectedKeys={rowsPerPage}
                        onSelectionChange={setRowsPerPage}
                    >
                        {(rows) => (
                            <DropdownItem key={rows.value}>
                                {rows.label}
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </Dropdown>
            </div>
        </header>
    )
}
