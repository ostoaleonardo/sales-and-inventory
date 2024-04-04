export const getFormattedDate = (date: string) => {
    const formattedDate = new Date(date)

    return formattedDate.toLocaleDateString('es', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })
}
