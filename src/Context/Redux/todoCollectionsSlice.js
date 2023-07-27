import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const todoCollectionAdapter = createEntityAdapter()

import { store } from "./store";

export const {
    selectAll : selectAllCollectionRecords, 
    selectById : selectCollectionRecordsById,
    selectIds : selectCollectionRecordsIds,
    selectEntities : selectCollectionRecordsEntries,
} = todoCollectionAdapter.getSelectors(state => state.todoRecordsCollection)


const todoRecordsCollection = createSlice({
    name : "todoRecordsCollection",
    initialState : todoCollectionAdapter.getInitialState(),
    reducers : {
        addOne : {
            prepare : (action) => {
                console.dir(action)
                return {
                    payload : {
                        id : new Date().toString().slice(4, 24),
                        color : action?.color || "red",
                        name : action?.name || "Unnamed",
                        todoRecordsIds : action?.todoRecordsIds || []
                    }
                }
            },
            reducer : (state, action) => {
                todoCollectionAdapter.addOne(state, action.payload)
            }
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
        addOneTodoRecord : {
            prepare : (action) => {
                console.log("Add todo record : ")
                console.dir(action)
                return {
                    payload : {
                        id : action.id
                    }
                }
            },
            reducer : (state, action) => {
                return todoCollectionAdapter.updateOne(state, {id : action.payload.id, changes : {todoRecordsIds : ["New todo id", ...selectCollectionRecordsById(store.getState(), action.payload.id).todoRecordsIds]}})
            }
            
        }
            
    }
})

export const {addOne, removeOne, updateOne, updateNameAndColor, addOneTodoRecord} = todoRecordsCollection.actions

export default todoRecordsCollection.reducer