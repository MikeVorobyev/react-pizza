import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pizzasOnBackEnd: []
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizzasOnBackEnd(state, action) {
            state.pizzasOnBackEnd = action.payload
        }
    }
})

export const { setPizzasOnBackEnd } = pizzaSlice.actions

export default pizzaSlice.reducer