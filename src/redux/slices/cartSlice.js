import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    totalPrice: 0,
    items: []
}

// ========= ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==============

// 1. Универсальный поиск пиццы по ID
const findItemById = (items, actionId) => items.find(item => item.id === actionId)

// 2. Универсальный пересчёт общей суммы корзины
const totalPriceRecalculate = (items) => items.reduce((acc, item) => acc + (item.price * item.count), 0)

// ================================================

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = findItemById(state.items, action.payload.id)

            if (findItem) { 
                findItem.count++ 
            } else { 
                state.items.push({ ...action.payload, count: 1 }) 
            }

            state.totalPrice = totalPriceRecalculate(state.items)
        },
        
        plusItem(state, action) {
            const findItem = findItemById(state.items, action.payload)
            
            // Защита: если элемент не найден, просто выходим из функции
            if (!findItem) return 

            findItem.count++
            state.totalPrice = totalPriceRecalculate(state.items)
        },
        
        minusItem(state, action) {
            const findItem = findItemById(state.items, action.payload)
            
            if (!findItem) return

            if (findItem.count > 1) { 
                findItem.count-- 
            }

            state.totalPrice = totalPriceRecalculate(state.items)
        },
        
        removeItem(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload)
            state.totalPrice = totalPriceRecalculate(state.items)
        },
        
        clearItem(state) {
            state.items = []
            state.totalPrice = 0
        },
    },
})

export const { addItem, removeItem, clearItem, plusItem, minusItem } = cartSlice.actions

export default cartSlice.reducer