import { today, getLocalTimeZone, startOfWeek, toCalendarDateTime } from '@internationalized/date'

const locale = 'es'

export const now = today(getLocalTimeZone())

export const getDaysOfLastWeek = () => {
    // Get the start of the last complete week
    const lastWeekStart = startOfWeek(now.subtract({ weeks: 1 }), locale)

    // Get each day of the last complete week
    const daysOfLastWeek = Array.from({ length: 7 }, (_, i) => lastWeekStart.add({ days: i }))

    // Format each day to include the day name and ISO string
    const daysOfWeek = daysOfLastWeek.map((day) => {
        const dayString = day.toDate(getLocalTimeZone())
        const dayName = dayString.toLocaleDateString(locale, { weekday: 'short' })
        const dayISO = toCalendarDateTime(day).toString()

        return { dayName, dayISO }
    })

    return daysOfWeek
}
