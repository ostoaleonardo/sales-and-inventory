import { Slider } from '@nextui-org/react'

type Props = {
    value: number
    count: number
    label: string
}

export function BarGraph({ value, count, label }: Props) {
    return (
        <div className='h-full flex flex-col items-center justify-center gap-8'>
            <Slider
                size='md'
                hideThumb
                isDisabled
                minValue={0}
                maxValue={100}
                defaultValue={value}
                orientation='vertical'
                aria-label='Bar graph'
                classNames={{
                    base: 'opacity-100',
                    filler: 'animate-bar-growth',
                }}
            />

            <div className='flex flex-col items-center justify-center gap-1'>
                <span className='text-lg font-semibold'>{count}</span>
                <span className='text-xs text-default-400 capitalize'>{label}</span>
            </div>
        </div>
    )
}
