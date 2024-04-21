export type Sale = {
    id: string
    total: number
    seller: string
    created_at: string
}

export type SalesItem = {
    id: string
    sale_id: string
    item_id: string
    quantity: number
    created_at: string
}

export type Dish = {
    id: string
    name: string
    price: number
    categories: Categories
    created_at: string
}

export type Categories = {
    id: string
    name: string
    created_at: string
}
