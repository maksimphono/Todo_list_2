import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name : "filterTodoRecords",
    initialState : {__proxy__ : null, qwerty : 999},
    reducers : {
        setFilters : (state, action) => {
            return {
                ...state,
                selectedEndDateTo : action.payload.selectedEndDateTo,
                selectedEndDateFrom : action.payload.selectedEndDateFrom,
                selectedCollectionIds : action.payload.selectedCollectionIds,
                searchFieldValue : action.payload.searchFieldValue
            }
        },
        resetFilters : (state, action) => {
            return {__proto__ : null}
        }
    }
})

export const {setFilters, resetFilters} = filtersSlice.actions

export default filtersSlice.reducer