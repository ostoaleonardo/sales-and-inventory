export const INITIAL_SALES_COLUMNS = [
    'seller',
    'items',
    'total',
    'actions'
]

export const SALES_COLUMNS = [
    { name: 'ID', uid: 'id', sortable: true },
    { name: 'VENDEDOR', uid: 'seller', sortable: true },
    { name: 'ARTÍCULOS', uid: 'items', sortable: true },
    { name: 'TOTAL', uid: 'total', sortable: true },
    { name: 'CREADO', uid: 'created_at', sortable: true },
    { name: 'ACCIONES', uid: 'actions' },
]

export const CART_COLUMNS = [
    { name: 'ID', uid: 'id', sortable: true },
    { name: 'ARTÍCULO', uid: 'item', sortable: true },
    { name: 'CANTIDAD', uid: 'quantity', sortable: true },
    { name: 'PRECIO', uid: 'price', sortable: true },
    { name: 'SUBTOTAL', uid: 'subtotal', sortable: true },
    { name: 'ACCIONES', uid: 'actions' }
]
