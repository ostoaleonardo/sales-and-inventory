import { eachDayOfInterval, endOfWeek, startOfWeek, subWeeks } from 'date-fns'

export const getDaysOfLastWeek = () => {
    // Get the start and end date of the last complete week
    const now = new Date()
    const lastWeekStart = startOfWeek(subWeeks(now, 1))
    const lastWeekEnd = endOfWeek(subWeeks(now, 1))

    // Get each day of the last complete week
    const daysOfLastWeek = eachDayOfInterval({ start: lastWeekStart, end: lastWeekEnd })

    // Format each day to include the day name and ISO string
    const daysOfWeek = daysOfLastWeek.map((day) => ({
        dayName: new Date(day).toLocaleString('es', { weekday: 'short' }),
        dayISO: day.toISOString()
    }))

    return daysOfWeek
}
