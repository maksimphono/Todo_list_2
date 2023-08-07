import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/*
sortComparer : (a, b) => {
        const dateA = new Date(a.dateEnd)
        const dateB = new Date(b.dateEnd)
        return dateA - dateB;
    }
*/

import EntityAsyncStorageAdapter from "./EntityAsyncStorageAdapter";

const todoRecordsAdapter = createEntityAdapter({
})

const todoRecordsStorageAdapter = new EntityAsyncStorageAdapter("todoRecords", "todo_record", "todo_records_ids")

export const todoRecordsStorageThunks = todoRecordsStorageAdapter.thunks

const todoRecordsSlice = createSlice({
    name : "todoRecords",
    initialState : todoRecordsAdapter.getInitialState({loadstatus : "idle"}),
    reducers : {
        addOne : todoRecordsAdapter.addOne,
        removeOne : (state, action) => {
            todoRecordsAdapter.removeOne(state, action)
            
        },
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
        addManyTodos : todoRecordsAdapter.addMany,
        removeMany : todoRecordsAdapter.removeMany
    },
    extraReducers : (builder) => {
        builder.addCase(todoRecordsStorageAdapter.thunks.loadAll.fulfilled, (state, action) => {
            state.loadstatus = "loaded"
            return todoRecordsAdapter.setAll(state, action.payload)
        })
    }
})

export const {
    addOne,
    removeOne,
    removeMany,
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