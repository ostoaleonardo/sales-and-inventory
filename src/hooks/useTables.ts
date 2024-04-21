import { supabase } from '@/database'

export function useTables() {
    const getAllRows = async (table: string, relationship?: string) => {
        const query = relationship ? '*,' + relationship : '*'

        let { data } = await supabase
            .from(table)
            .select(query)

        return data as unknown || []
    }

    const getRowsPerPage = async (table: string, from: number, to: number, relationship?: string) => {
        const query = relationship ? '*,' + relationship : '*'

        let { data } = await supabase
            .from(table)
            .select(query)
            .range(from, to)

        return data as unknown || []
    }

    const getAllRowsByDateRange = async (table: string, column: string, from: any, to: any, relationship?: string) => {
        const query = relationship ? '*,' + relationship : '*'

        let { data } = await supabase
            .from(table)
            .select(query)
            .gte(column, from)
            .lte(column, to)

        return data || []
    }

    const getRowsPerPageByDateRange = async (table: string, column: string, from: any, to: any, fromRow: number, toRow: number, relationship?: string) => {
        const query = relationship ? '*,' + relationship : '*'

        let { data } = await supabase
            .from(table)
            .select(query)
            .gte(column, from)
            .lte(column, to)
            .range(fromRow, toRow)

        return data || []
    }

    const getRowById = async (table: string, id: number) => {
        let { data } = await supabase
            .from(table)
            .select('*')
            .eq('id', id)
            .single()

        return data || {}
    }

    const getRowsByColumn = async (table: string, column: string, value: any, relationship?: string) => {
        const query = relationship ? '*,' + relationship : '*'

        let { data } = await supabase
            .from(table)
            .select(query)
            .eq(column, value)

        return data || []
    }

    const insertRow = async (table: string, values: any) => {
        let { data } = await supabase
            .from(table)
            .insert(values)
            .select()

        return data || []
    }

    const updateRow = async (table: string, id: number, values: any) => {
        let { data } = await supabase
            .from(table)
            .update(values)
            .eq('id', id)

        return data
    }

    const upsertRow = async (table: string, values: any) => {
        let { data } = await supabase
            .from(table)
            .upsert(values)

        return data
    }

    const deleteRow = async (table: string, id: number) => {
        const { error } = await supabase
            .from(table)
            .delete()
            .eq('id', id)

        return error
    }

    const countRows = async (table: string) => {
        let { count } = await supabase
            .from(table)
            .select('*', { count: 'exact' })

        return count || 0
    }

    const countRowsByDateRange = async (table: string, column: string, from: any, to: any) => {
        let { count } = await supabase
            .from(table)
            .select('*', { count: 'exact' })
            .gte(column, from)
            .lte(column, to)

        return count || 0
    }

    const filterRows = async (table: string, column: string, value: any) => {
        let { data } = await supabase
            .from(table)
            .select('*')
            .ilike(column, value)

        return data || []
    }

    return {
        getAllRows,
        getRowsPerPage,
        getAllRowsByDateRange,
        getRowsPerPageByDateRange,
        getRowById,
        getRowsByColumn,
        insertRow,
        updateRow,
        upsertRow,
        deleteRow,
        countRows,
        countRowsByDateRange,
        filterRows
    }
}
