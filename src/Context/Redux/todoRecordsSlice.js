import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const todoRecordsAdapter = createEntityAdapter({
    sortComparer : (a, b) => {
        const dateA = new Date(a.dateEnd)
        const dateB = new Date(b.dateEnd)
        return dateA - dateB;
    }
})

const todoRecordsSlice = createSlice({
    name : "todoRecords",
    initialState : todoRecordsAdapter.getInitialState(),
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
        }
    }
})

export const {
    addOne,
    removeOne,
    alterTodoRecord
} = todoRecordsSlice.actions;

export const {
    selectAll : selectAllTodoRecords, 
    selectById : selectTodoRecordsById,
    selectIds : selectTodoRecordsIds,
    selectEntities : selectTodoRecordsEntries,
} = todoRecordsAdapter.getSelectors(state => state.todoRecords)

export default todoRecordsSlice.reducer;