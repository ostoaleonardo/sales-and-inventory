import { useCallback } from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react'
import { Calendar } from '@/components'
import { Search, LayoutColumn, Add } from '@/icons'
import { SALES_COLUMNS, ROWS_PER_PAGE } from '@/constants'

type Props = {
    // Rows
    onAdd: () => void,
    totalRows: number,

    // Search
    filterValue: string,
    setFilterValue: (value: string) => void,

    // Filters
    dateFilter: any,
    setDateFilter: (value: any) => void,

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
    setFilterValue,

    // Filters
    dateFilter,
    setDateFilter,

    // Show/Hide Columns
    visibleColumns,
    setVisibleColumns,

    // Pagination
    rowsPerPage,
    setRowsPerPage
}: Props) {
    const rowsPerPageValue = Number(Array.from(rowsPerPage)[0])

    // Search
    const onSearchChange = useCallback((value: string) => {
        if (value) {
            setFilterValue(value)
        } else {
            setFilterValue('')
        }
    }, [])

    const onClear = useCallback(() => {
        setFilterValue('')
    }, [])

    return (
        <header className='flex flex-col gap-8'>
            <div className='flex flex-col sm:flex-row justify-between gap-4'>
                <Input
                    isClearable
                    onClear={onClear}
                    value={filterValue}
                    onValueChange={onSearchChange}
                    placeholder='Buscar venta'
                    className='w-full sm:max-w-[44%]'
                    startContent={<Search className='w-4 h-4' />}
                />
                <div className='w-full flex justify-end gap-3'>
                    <Calendar
                        dateFilter={dateFilter}
                        setDateFilter={setDateFilter}
                    />
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
                            items={SALES_COLUMNS}
                            selectionMode='multiple'
                            selectedKeys={visibleColumns}
                            onSelectionChange={setVisibleColumns}
                        >
                            {(column) => (
                                <DropdownItem key={column.uid} className='capitalize'>
                                    {column.name}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <Button
                        color='primary'
                        onPress={onAdd}
                        endContent={<Add className='w-4 h-4' />}
                    >
                        Agregar venta
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
