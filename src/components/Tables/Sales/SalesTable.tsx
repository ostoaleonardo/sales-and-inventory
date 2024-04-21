import { useCallback, useEffect, useMemo, useState } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Chip, Listbox, ListboxItem, User, RangeValue, DateValue } from '@nextui-org/react'
import { TopContent, BottomContent } from '.'
import { Paragraph, DropdownActions, IdSnippet } from '@/components'
import { useAuth, useTables } from '@/hooks'
import { getFormattedDate } from '@/utils'
import { Sale } from '@/types'
import { INITIAL_SALES_COLUMNS, SALES_COLUMNS, TABLES } from '@/constants'

type Props = {
    onAdd: () => void
    onEdit: (id: number) => void
}

type SortDescriptor = {
    column: keyof Sale
    direction: 'ascending' | 'descending'
}

const RELATIONSHIP = 'sales_items(dishes(name,price), quantity)'

export function SalesTable({ onAdd, onEdit }: Props) {
    const { user } = useAuth()
    const {
        getAllRows,
        getRowsPerPage,
        getAllRowsByDateRange,
        getRowsPerPageByDateRange,
        countRows,
        deleteRow
    } = useTables()

    // Data
    const [sales, setSales] = useState<any[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Columns
    const [visibleColumns, setVisibleColumns] = useState(INITIAL_SALES_COLUMNS)

    // Search
    const [filterValue, setFilterValue] = useState('')

    // Filters
    const [dateFilter, setDateFilter] = useState<RangeValue<DateValue | null>>({
        start: null,
        end: null
    })

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
                if (dateFilter.start && dateFilter.end) {
                    const sales = await getAllRowsByDateRange(
                        TABLES.SALES,
                        'created_at',
                        dateFilter.start,
                        dateFilter.end,
                        RELATIONSHIP
                    ) as any[]

                    setSales(sales)
                } else {
                    const sales = await getAllRows(TABLES.SALES, RELATIONSHIP) as any[]
                    setSales(sales)
                }
            } else {
                if (fromRow > toRow) return

                if (dateFilter.start && dateFilter.end) {
                    const sales = await getRowsPerPageByDateRange(
                        TABLES.SALES,
                        'created_at',
                        dateFilter.start,
                        dateFilter.end,
                        fromRow,
                        toRow,
                        RELATIONSHIP
                    ) as any[]

                    setSales(sales)
                } else {
                    const sales = await getRowsPerPage(
                        TABLES.SALES,
                        fromRow,
                        toRow,
                        RELATIONSHIP
                    ) as any[]

                    setSales(sales)
                }

            }

            const totalRows = await countRows(TABLES.SALES)
            setTotalRows(totalRows)

            setIsLoaded(false)
        })()
    }, [fromRow, toRow, rowsPerPage, dateFilter])

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
        if (Array.from(visibleColumns).length === SALES_COLUMNS.length) return SALES_COLUMNS

        return SALES_COLUMNS.filter((column) => Array.from(visibleColumns).includes(column.uid))
    }, [visibleColumns])

    // Search and Filter
    const hasSearchFilter = Boolean(filterValue)

    const filteredItems = useMemo(() => {
        let filteredDishes = sales

        if (hasSearchFilter) {
            filteredDishes = sales
                .filter(({ id }) => id.toLowerCase()
                    .includes(filterValue.toLowerCase()))
        }

        return filteredDishes
    }, [sales, filterValue])

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
                    <IdSnippet id={item.id} />
                )
            case 'items':
                return (
                    <Listbox
                        aria-label='Sales items'
                        items={item.sales_items as any[]}
                        itemClasses={{
                            base: 'first:rounded-t-md last:rounded-b-md rounded-none',
                        }}
                    >
                        {(item) => (
                            <ListboxItem
                                key={item.dishes.name}
                                endContent={
                                    <Chip
                                        size='sm'
                                        variant='flat'
                                        color='primary'
                                    >
                                        ${item.dishes.price} × {item.quantity}
                                    </Chip>
                                }
                            >
                                {item.dishes.name}
                            </ListboxItem>
                        )}
                    </Listbox>
                )
            case 'total':
                return (
                    <Paragraph>{item.total}</Paragraph>
                )
            case 'seller':
                return (
                    <User
                        name={item.seller.split('-')[0]}
                        description={user?.role}
                        classNames={{
                            base: 'gap-3',
                            description: 'capitalize'
                        }}
                        avatarProps={{
                            size: 'sm',
                            isBordered: true,
                            name: item.seller[0],
                            className: 'uppercase'
                        }}
                    />
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
                        onDelete={() => deleteRow(TABLES.SALES, item.id)}
                    />
                )
            default:
                return null
        }
    }, [user])

    const topContent = useMemo(() => {
        return (
            <TopContent
                // Rows
                onAdd={onAdd}
                totalRows={totalRows}

                // Search
                filterValue={filterValue}
                setFilterValue={setFilterValue}

                // Filters
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}

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
        dateFilter,
        setDateFilter,
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
