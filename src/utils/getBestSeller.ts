export const getBestSeller = (sales: any) => {
    return sales.reduce((acc: any, sale: any) => {
        const { dishes, quantity } = sale
        const { name, price } = dishes
        const total = price * quantity

        const existing = acc.find((item: any) => item.name === name)

        if (existing) {
            existing.quantity += quantity
            existing.total += total
        } else {
            acc.push({ name, price, quantity, total })
        }

        return acc.sort((a: any, b: any) => b.quantity - a.quantity).slice(0, 6)
    }, [])
}
