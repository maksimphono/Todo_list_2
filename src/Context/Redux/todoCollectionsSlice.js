import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const todoCollectionAdapter = createEntityAdapter()

const todoRecordsCollection = createSlice({
    name : "todoRecordsCollection",
    initialState : todoCollectionAdapter.getInitialState(),
    reducers : {
        addOne : {
            prepare : (action) => {
                return {
                    payload : {
                        id : new Date().toString().slice(4, 24),
                        color : action?.color || "red",
                        name : action?.name || "Unnamed",
                        todoRecordsIds : action?.todoRecordsIds || []
                    }
                }
            },
            reducer : (state, action) => todoCollectionAdapter.addOne(state, action.payload)
        },
        removeOne : todoCollectionAdapter.removeOne,
        updateOne : todoCollectionAdapter.updateOne
    }
})

export const {addOne, removeOne, updateOne} = todoRecordsCollection.actions

export default todoRecordsCollection.reducer