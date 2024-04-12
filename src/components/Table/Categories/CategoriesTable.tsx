import { useCallback, useEffect, useMemo, useState } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from '@nextui-org/react'
import { TopContent, BottomContent } from '.'
import { Paragraph, DropdownActions } from '@/components'
import { getFormattedDate } from '@/utils'
import { useTables } from '@/hooks'
import { Categories } from '@/types'
import { INITIAL_CATEGORIES_COLUMNS, CATEGORIES_COLUMNS, TABLES } from '@/constants'

type Props = {
    onAdd: () => void
    onEdit: (id: number) => void
}

type SortDescriptor = {
    column: keyof Categories
    direction: 'ascending' | 'descending'
}

export function CategoriesTable({ onAdd, onEdit }: Props) {
    const { getAllRows, getRowsPerPage, countRows, deleteRow } = useTables()

    // Data
    const [categories, setCategories] = useState<Categories[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Columns
    const [visibleColumns, setVisibleColumns] = useState(INITIAL_CATEGORIES_COLUMNS)

    // Search
    const [filterValue, setFilterValue] = useState('')

    // Pagination
    const [rowsPerPage, setRowsPerPage] = useState(['10'])
    const [fromRow, setFromRow] = useState(0)
    const [toRow, setToRow] = useState(9)
    const [totalRows, setTotalRows] = useState(0)
    const rowsPerPageValue = Number(Array.from(rowsPerPage)[0])

    // Sorting
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: 'id',
        direction: 'ascending',
    })

    useEffect(() => {
        (async () => {
            setIsLoaded(true)

            if (rowsPerPageValue === -1) {
                const categories = await getAllRows(TABLES.CATEGORIES)
                setCategories(categories as Categories[])
            } else {
                if (fromRow > toRow) return

                const categories = await getRowsPerPage(
                    TABLES.CATEGORIES,
                    fromRow,
                    toRow,
                )

                setCategories(categories as Categories[])
            }

            const totalRows = await countRows(TABLES.CATEGORIES)
            setTotalRows(totalRows)

            setIsLoaded(false)
        })()
    }, [fromRow, toRow, rowsPerPage])

    // Pagination
    useEffect(() => {
        if (rowsPerPageValue === -1) {
            setToRow(-1)
            return
        }

        const newToRow = fromRow + rowsPerPageValue - 1
        setToRow(newToRow > totalRows - 1 ? totalRows - 1 : newToRow)
    }, [fromRow, rowsPerPage, totalRows])

    const onPreviousPage = useCallback(() => {
        const prevFromRow = fromRow - rowsPerPageValue
        setFromRow(prevFromRow < 0 ? 0 : prevFromRow)
    }, [fromRow, rowsPerPage])

    const onNextPage = useCallback(() => {
        const nextFromRow = fromRow + rowsPerPageValue
        setFromRow(nextFromRow > totalRows - 1 ? totalRows - 1 : nextFromRow)
    }, [fromRow, rowsPerPage, totalRows])

    // Columns
    const headerColumns = useMemo(() => {
        if (Array.from(visibleColumns).length === CATEGORIES_COLUMNS.length) return CATEGORIES_COLUMNS

        return CATEGORIES_COLUMNS.filter((column) => Array.from(visibleColumns).includes(column.uid))
    }, [visibleColumns])

    // Search and Filter
    const hasSearchFilter = Boolean(filterValue)

    const filteredItems = useMemo(() => {
        let filteredDishes = categories

        if (hasSearchFilter) {
            filteredDishes = categories
                .filter(({ name }) => name.toLowerCase()
                    .includes(filterValue.toLowerCase()))
        }

        return filteredDishes
    }, [categories, filterValue])

    // Sorting
    const sortedItems = useMemo(() => {
        return filteredItems.sort((a, b) => {
            const first = a[sortDescriptor.column]
            const second = b[sortDescriptor.column]
            const cmp = first < second ? -1 : first > second ? 1 : 0

            return sortDescriptor.direction === 'descending' ? -cmp : cmp
        })
    }, [filteredItems, sortDescriptor])

    const renderCell = useCallback((item: any, columnKey: string) => {
        switch (columnKey) {
            case 'id':
                return (
                    <Paragraph>{item.id}</Paragraph>
                )
            case 'name':
                return (
                    <Paragraph>{item.name}</Paragraph>
                )
            case 'price':
                return (
                    <Paragraph>{item.price}</Paragraph>
                )
            case 'category':
                return (
                    <Paragraph>{item.category}</Paragraph>
                )
            case 'created_at':
                return (
                    <Paragraph>
                        {getFormattedDate(item.created_at)}
                    </Paragraph>
                )
            case 'actions':
                return (
                    <DropdownActions
                        onEdit={() => onEdit(item.id)}
                        onDelete={() => deleteRow(TABLES.CATEGORIES, item.id)}
                    />
                )
            default:
                return null
        }
    }, [])

    const topContent = useMemo(() => {
        return (
            <TopContent
                // Rows
                onAdd={onAdd}
                totalRows={totalRows}

                // Search
                filterValue={filterValue}
                setFilterValue={setFilterValue}

                // Show/Hide Columns
                visibleColumns={visibleColumns}
                setVisibleColumns={setVisibleColumns}

                // Pagination
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />
        )
    }, [
        onAdd,
        totalRows,
        filterValue,
        setFilterValue,
        visibleColumns,
        setVisibleColumns,
        rowsPerPage,
        setRowsPerPage
    ])

    const bottomContent = useMemo(() => {
        return (
            <BottomContent
                fromRow={fromRow}
                toRow={toRow}
                totalRows={totalRows}
                onPreviousPage={onPreviousPage}
                onNextPage={onNextPage}
            />
        )
    }, [
        fromRow,
        toRow,
        totalRows,
        onPreviousPage,
        onNextPage
    ])

    return (
        <Table
            aria-label='Dishes Table'
            isHeaderSticky
            classNames={{
                base: 'justify-between',
                wrapper: 'h-[400px]',
            }}
            topContent={topContent}
            topContentPlacement='outside'
            bottomContent={bottomContent}
            bottomContentPlacement='outside'
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor as any}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                items={sortedItems}
                loadingContent={<Spinner />}
                loadingState={isLoaded ? 'loading' : 'idle'}
                emptyContent={!isLoaded && 'No hay elementos para mostrar'}
            >
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => (
                            <TableCell>
                                {renderCell(item, columnKey as string)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
