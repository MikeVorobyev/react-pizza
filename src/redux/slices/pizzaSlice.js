import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async () => {
//       const response = await userAPI.fetchById(userId)
//       return response.data
//     },
//   )

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