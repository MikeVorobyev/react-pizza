import { configureStore } from "@reduxjs/toolkit"; // configureStore мы добавили из redux библиотеки
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice"
import pizzaSlice from "./slices/pizzaSlice";

export const store = configureStore({
    reducer: {
        filterReducer: filterSlice,
        cartReducer: cartSlice,
        pizzaReducer: pizzaSlice
    },
})
