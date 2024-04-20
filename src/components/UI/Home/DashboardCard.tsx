import { Card, CardHeader, CardBody, Spinner } from '@nextui-org/react'

type Props = {
    title: string
    number: number | string
    icon: JSX.Element
    isLoading?: boolean
}

export function DashboardCard({ title, number, icon, isLoading }: Props) {
    return (
        <Card shadow='sm' className='flex flex-row bg-zinc-950/60 max-sm:p-1 p-2'>
            <CardHeader className='w-fit items-center'>
                <div className='flex items-center justify-center text-primary bg-primary/10 rounded-2xl p-4 sm:p-5'>
                    {icon}
                </div>
            </CardHeader>
            <CardBody className='flex items-start justify-center gap-1 max-sm:pl-0'>
                <h4 className='text-xs lg:text-sm text-default-400 font-semibold line-clamp-1'>
                    {title}
                </h4>
                {isLoading
                    ? <Spinner size='sm' />
                    : <p className='text-base lg:text-xl font-semibold'>{number}</p>
                }
            </CardBody>
        </Card>
    )
}
