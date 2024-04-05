export const INITIAL_VISIBLE_COLUMNS = [
    'id',
    'name',
    'price',
    'category',
    'actions'
]

export const DISHES_COLUMNS = [
    { name: 'ID', uid: 'id', sortable: true },
    { name: 'NOMBRE', uid: 'name', sortable: true },
    { name: 'PRECIO', uid: 'price', sortable: true },
    { name: 'CATEGORIA', uid: 'category', sortable: true },
    { name: 'CREADO', uid: 'created_at', sortable: true },
    { name: 'ACCIONES', uid: 'actions' },
]

export const DISHES_CATEGORIES = [
    { name: 'Bebidas', uid: 'bebidas' },
    { name: 'Platillos', uid: 'platillos' },
    { name: 'Postres', uid: 'postres' },
    { name: 'Extras', uid: 'extras' },
]
