import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    categoryID: 0,
    pageInitObj: {
        pageCount: 1,
        limitItemsOnPage: 8,
        allItemsFromServer: 0
    },
    popupSort: {
        name: 'популярности',
        sort: 'rating',
        id: 0,
        rotateSortSVG: ''
    },
    searchValueFrontEnd: ''
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoriesID(state, action) {
            state.categoryID = action.payload
        },
        setPopupSort(state, action) {
            state.popupSort = action.payload
        },
        setPage(state, action) {
            state.pageInitObj = action.payload
        },
        setFilters(state, action) {
            state.categoryID = Number(action.payload.category)
            state.pageInitObj.pageCount = +action.payload.page // Вместо преобразования строки в число с помощью "Number(action.payload.page)", которое называется "явное преобразование",
                                                               // можно использовать унарный оператор "плюс +" для превращения строки в число ,
                                                               // которое называется "НЕявное преобразование". Пример НЕявного преобразования: "+action.payload.page"
            state.popupSort.sort = action.payload.sortBy
        },
        setSearchValueFrontEnd(state, action) {
            state.searchValueFrontEnd = action.payload
        }
    },
})



export const { setCategoriesID, setPopupSort, setPage, setFilters, setSearchValueFrontEnd } = filterSlice.actions


export default filterSlice.reducer