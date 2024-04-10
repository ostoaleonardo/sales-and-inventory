import { supabase } from '@/database'

export function useTables() {
    const getAllRows = async (table: string) => {
        let { data } = await supabase
            .from(table)
            .select('*')

        return data || []
    }

    const getRowsPerPage = async (table: string, from: number, to: number, relationship?: string) => {
        const query = relationship ? '*,' + relationship : '*'

        let { data } = await supabase
            .from(table)
            .select(query)
            .range(from, to)

        return data as unknown || []
    }

    const getRowById = async (table: string, id: number) => {
        let { data } = await supabase
            .from(table)
            .select('*')
            .eq('id', id)
            .single()

        return data || {}
    }

    const insertRow = async (table: string, values: any) => {
        let { data } = await supabase
            .from(table)
            .insert([values])

        return data
    }

    const updateRow = async (table: string, id: number, values: any) => {
        let { data } = await supabase
            .from(table)
            .update(values)
            .eq('id', id)

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
        getRowById,
        insertRow,
        updateRow,
        deleteRow,
        countRows,
        filterRows
    }
}
