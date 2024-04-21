import { Snippet } from '@nextui-org/react'
import { Copy } from '@/icons'

export function IdSnippet({ id }: { id: string }) {
    return (
        <Snippet
            size='sm'
            hideSymbol
            radius='md'
            variant='flat'
            copyIcon={<Copy width='12' height='12' />}
            onCopy={() => navigator.clipboard.writeText(id)}
            className='gap-0 pr-0'
            tooltipProps={{
                content: 'Copiar'
            }}
        >
            {id.split('-')[0]}
        </Snippet>
    )
}
