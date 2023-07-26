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
        updateNameAndColor : {
            prepare : (action) => {
                return {
                    payload : {
                        id : action.id,
                        changes : {
                            color: action.color,
                            name : action.name
                        }                        
                    }
                }
            },
            reducer : (state, action) => todoCollectionAdapter.updateOne(state, action.payload)
        },
        removeOne : todoCollectionAdapter.removeOne,
        updateOne : todoCollectionAdapter.updateOne
    }
})

export const {addOne, removeOne, updateOne, updateNameAndColor} = todoRecordsCollection.actions


export const {
    selectAll : selectAllCollectionRecords, 
    selectById : selectCollectionRecordsById,
    selectIds : selectCollectionRecordsIds,
    selectEntities : selectCollectionRecordsEntries,
} = todoCollectionAdapter.getSelectors(state => state.todoRecordsCollection)


export default todoRecordsCollection.reducer