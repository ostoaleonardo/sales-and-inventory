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
