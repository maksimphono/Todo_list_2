import { createSlice } from "@reduxjs/toolkit";

const sortTodoRecordsSlice = createSlice({
    name : "sortTodoRecordsSlice",
    initialState : {
        __proto__ : null,
        parameter : null,
        reversed : false
    },
    reducers : {
        setSortParams : (state, action) => {
            return {
                parameter : action.payload.parameter,
                reversed : action.payload.reversed
            }
        },
        resetSortParams : () => {
            return {
                __proto__ : null,
                parameter : null,
                reversed : false
            }
        }
    }
})

export const {setSortParams, resetSortParams} = sortTodoRecordsSlice.actions

export default sortTodoRecordsSlice.reducer