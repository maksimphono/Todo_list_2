import { createSlice } from "@reduxjs/toolkit";

const initialState = {__proto__ : null, filtersEnabled : false}

const filtersSlice = createSlice({
    name : "filterTodoRecords",
    initialState,
    reducers : {
        setFilters : (state, action) => {
            return {
                ...state,
                filtersEnabled : true,
                selectedEndDateTo : action.payload.selectedEndDateTo,
                selectedEndDateFrom : action.payload.selectedEndDateFrom,
                selectedCollectionIds : action.payload.selectedCollectionIds,
                searchFieldValue : action.payload.searchFieldValue
            }
        },
        resetFilters : (state, action) => {
            return initialState
        }
    }
})

export const {setFilters, resetFilters} = filtersSlice.actions

export default filtersSlice.reducer