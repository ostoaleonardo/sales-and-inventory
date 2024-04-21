import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Selection } from '@nextui-org/react'
import { Search, LayoutColumn, Add, ArrowDown } from '@/icons'
import { useTables } from '@/hooks'
import { DISHES_COLUMNS, ROWS_PER_PAGE } from '@/constants'
import { Categories } from '@/types'

type Props = {
    // Rows
    onAdd: () => void,
    totalRows: number,

    // Search
    filterValue: string,
    setFilterValue: (value: string) => void,

    // Filters
    statusFilter: Selection,
    setStatusFilter: (value: any) => void,

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
    statusFilter,
    setStatusFilter,

    // Show/Hide Columns
    visibleColumns,
    setVisibleColumns,

    // Pagination
    rowsPerPage,
    setRowsPerPage
}: Props) {
    const { getAllRows } = useTables()
    const [categories, setCategories] = useState<Categories[]>([])
    const [filterCategories, setFilterCategories] = useState('')
    const rowsPerPageValue = Number(Array.from(rowsPerPage)[0])

    useEffect(() => {
        (async () => {
            const categories = await getAllRows('categories') as Categories[]
            setCategories(categories)

            const categoriesIds = categories.map(({ id }) => id)
            setStatusFilter(new Set(categoriesIds))
        })()
    }, [])

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

    // Categories Filter
    const hasSearchFilter = Boolean(filterCategories)

    const filteredItems = useMemo(() => {
        let filteredCategories = categories

        if (hasSearchFilter) {
            filteredCategories = categories
                .filter(({ name }) => name.toLowerCase()
                    .includes(filterCategories.toLowerCase()))
        }

        return filteredCategories
    }, [categories, filterCategories])

    const topContent = useMemo(() => {
        return (
            <Input
                isClearable
                value={filterCategories}
                onValueChange={setFilterCategories}
                placeholder='Buscar categoría'
                startContent={<Search className='w-4 h-4' />}
                className='sticky top-0 shadow-sm z-30'
            />
        )
    }, [filterCategories])

    return (
        <header className='flex flex-col gap-8'>
            <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                <Input
                    isClearable
                    onClear={onClear}
                    value={filterValue}
                    onValueChange={onSearchChange}
                    placeholder='Buscar platillo'
                    className='w-full sm:max-w-[44%]'
                    startContent={<Search className='w-4 h-4' />}
                />
                <div className='flex self-end gap-3'>
                    <Dropdown>
                        <DropdownTrigger className='hidden sm:flex'>
                            <Button
                                variant='flat'
                                endContent={<ArrowDown className='w-4 h-4' />}
                            >
                                Categorías
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label='Status Filter'
                            closeOnSelect={false}
                            items={filteredItems}
                            topContent={topContent}
                            selectionMode='multiple'
                            selectedKeys={statusFilter}
                            onSelectionChange={setStatusFilter}
                            emptyContent='No hay categorías'
                            classNames={{
                                base: 'max-h-64 overflow-y-auto scrollbar-thin gap-2',
                            }}
                        >
                            {(category) => (
                                <DropdownItem key={category.id}>
                                    {category.name}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
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
                            items={DISHES_COLUMNS}
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
                        Agregar platillo
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
