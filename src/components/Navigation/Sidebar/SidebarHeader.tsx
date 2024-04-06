export function SidebarHeader() {
    return (
        <div className='w-full flex items-center max-xl:justify-center border-b-1 border-white/10 px-6 py-4'>
            <div className='w-10 bg-white/10 rounded-full aspect-square' />
            <div className='hidden xl:flex flex-col ml-4'>
                <p className='font-semibold'>
                    Hola, <span>Usuario</span>
                </p>
                <span className='text-xs opacity-75'>
                    Empleado
                </span>
            </div>
        </div>
    )
}
