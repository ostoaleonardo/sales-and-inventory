type Props = {
    children: React.ReactNode,
}

export function Paragraph({ children }: Props) {
    return (
        <p className='text-bold text-small capitalize'>
            {children}
        </p>
    )
}
