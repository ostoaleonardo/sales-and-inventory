type Props = {
    children: React.ReactNode,
}

export function Typography({ children }: Props) {
    return (
        <h1 className='text-xl font-medium'>
            {children}
        </h1>
    )
}
