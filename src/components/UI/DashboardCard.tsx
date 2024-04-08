import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'

type Props = {
    title: string
    number: string
    icon: JSX.Element
    footer: string
}

export function DashboardCard({ title, number, icon, footer }: Props) {
    return (
        <Card shadow='sm' className='bg-zinc-950/60 p-2'>
            <CardHeader className='items-start justify-between pb-0'>
                <h4 className='text-xs lg:text-base text-default-600 font-semibold line-clamp-1'>
                    {title}
                </h4>
                <div className='flex items-center justify-center text-primary bg-primary/10 rounded-2xl p-4 sm:p-5'>
                    {icon}
                </div>
            </CardHeader>
            <CardBody className='flex justify-center gap-3'>
                <p className='text-3xl lg:text-5xl font-semibold'>
                    {number}
                </p>
            </CardBody>
            <CardFooter>
                <p className='text-sm text-default-400 line-clamp-1'>
                    {footer}
                </p>
            </CardFooter>
        </Card>
    )
}
