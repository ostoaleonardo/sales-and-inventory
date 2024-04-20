import { today, getLocalTimeZone, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from '@internationalized/date'

const locale = 'es'

export const now = today(getLocalTimeZone())

export const emptyDateRange = { start: null, end: null }

export const lastWeek = {
    start: startOfWeek(now.subtract({ weeks: 1 }), locale),
    end: endOfWeek(now.subtract({ weeks: 1 }), locale)
}

export const currentWeek = {
    start: startOfWeek(now, locale),
    end: endOfWeek(now, locale)
}

export const currentMonth = {
    start: startOfMonth(now),
    end: endOfMonth(now)
}
