import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
/*
sortComparer : (a, b) => {
        const dateA = new Date(a.dateEnd)
        const dateB = new Date(b.dateEnd)
        return dateA - dateB;
    }
*/


const todoRecordsAdapter = createEntityAdapter({
    
})

import { todoRecordsDataAdapter } from "../../LocalStorage/initStorage";

const loadAllTodoRecords = createAsyncThunk("todoRecords/loadAll", async () => {
    return todoRecordsDataAdapter.loadMany()
})

export {loadAllTodoRecords};


const todoRecordsSlice = createSlice({
    name : "todoRecords",
    initialState : todoRecordsAdapter.getInitialState({loadstatus : "idle"}),
    reducers : {
        addOne : todoRecordsAdapter.addOne,
        removeOne : todoRecordsAdapter.removeOne,
        alterTodoRecord : {
            prepare : action => ({
                payload : {
                    id : action.id,
                    changes : {
                        title : action.title,
                        content : action.content,
                        dateEnd : action.dateEnd,
                        collection : action.collection
                    }
                }
            }),
            reducer : (state, action) => {
                return todoRecordsAdapter.updateOne(state, action.payload)
            }
        },
        addManyTodos : todoRecordsAdapter.addMany
    },
    extraReducers : (builder) => {
        builder.addCase(loadAllTodoRecords.fulfilled, (state, action) => {
            state.loadstatus = "loaded"
            return todoRecordsAdapter.setAll(state, action.payload)
        })
    }
})

export const {
    addOne,
    removeOne,
    alterTodoRecord,
    addManyTodos
} = todoRecordsSlice.actions;

export const {
    selectAll : selectAllTodoRecords, 
    selectById : selectTodoRecordsById,
    selectIds : selectTodoRecordsIds,
    selectEntities : selectTodoRecordsEntries,
} = todoRecordsAdapter.getSelectors(state => state.todoRecords)

export default todoRecordsSlice.reducer;