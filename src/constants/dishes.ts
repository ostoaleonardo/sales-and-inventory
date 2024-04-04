export const INITIAL_VISIBLE_COLUMNS = [
    'id',
    'name',
    'price',
    'category',
    'actions'
]

export const DISHES_COLUMNS = [
    { name: 'ID', uid: 'id', sortable: true },
    { name: 'NAME', uid: 'name', sortable: true },
    { name: 'PRICE', uid: 'price', sortable: true },
    { name: 'CATEGORY', uid: 'category', sortable: true },
    { name: 'CREATED AT', uid: 'created_at', sortable: true },
    { name: 'ACTIONS', uid: 'actions' },
]

export const DISHES_CATEGORIES = [
    { name: 'Bebidas', uid: 'bebidas' },
    { name: 'Platillos', uid: 'platillos' },
    { name: 'Postres', uid: 'postres' },
    { name: 'Extras', uid: 'extras' },
]
