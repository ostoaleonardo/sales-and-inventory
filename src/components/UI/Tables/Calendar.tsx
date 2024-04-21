import { Button, ButtonGroup, DateRangePicker } from '@nextui-org/react'
import { currentMonth, currentWeek, lastWeek } from '@/utils'

type Props = {
    dateFilter: any
    setDateFilter: any
}

export function Calendar({ dateFilter, setDateFilter }: Props) {
    return (
        <DateRangePicker
            value={dateFilter}
            onChange={setDateFilter}
            className='max-w-72'
            CalendarTopContent={
                <ButtonGroup
                    fullWidth
                    size='sm'
                    radius='full'
                    variant='bordered'
                    className='bg-content1 p-3'
                >
                    <Button onPress={() => setDateFilter(currentWeek)}>
                        Esta semana
                    </Button>
                    <Button onPress={() => setDateFilter(lastWeek)}>
                        Semana pasada
                    </Button>
                    <Button onPress={() => setDateFilter(currentMonth)}>
                        Este mes
                    </Button>
                </ButtonGroup>
            }
        />
    )
}
