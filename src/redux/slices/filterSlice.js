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
            if (action.payload.category !== undefined) {
                state.categoryID = Number(action.payload.category)
            }
            if (action.payload.page !== undefined) {
                state.pageInitObj.pageCount = Number(action.payload.page)
            }
            if (action.payload.sortBy !== undefined) {
                state.popupSort.sort = action.payload.sortBy

                if (action.payload.sortBy === 'price') {
                    state.popupSort.name = 'цене'
                } else if (action.payload.sortBy === 'title') {
                    state.popupSort.name = 'алфавиту'
                } else {
                    state.popupSort.name = 'популярности'
                }
            }
        },
        
        setSearchValueFrontEnd(state, action) {
            state.searchValueFrontEnd = action.payload
        }
    },
})



export const { setCategoriesID, setPopupSort, setPage, setFilters, setSearchValueFrontEnd } = filterSlice.actions


export default filterSlice.reducer