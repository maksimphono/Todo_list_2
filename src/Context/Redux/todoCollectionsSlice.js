import { createAction, createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import EntityAsyncStorageAdapter from "./EntityAsyncStorageAdapter";

const todoCollectionAdapter = createEntityAdapter()

export const {
    selectAll : selectAllCollectionRecords, 
    selectById : selectCollectionRecordsById,
    selectIds : selectCollectionRecordsIds,
    selectEntities : selectCollectionRecordsEntries,
} = todoCollectionAdapter.getSelectors(state => state.todoRecordsCollection)

import { todoCollectionsDataAdapter } from "../../LocalStorage/initStorage";

const todoRecordsCollectionStorageAdapter = new EntityAsyncStorageAdapter("todoRecordsCollection", todoCollectionsDataAdapter)

export const collectionsRecordsThunks = todoRecordsCollectionStorageAdapter.thunks

const todoRecordsCollection = createSlice({
    name : "todoRecordsCollection",
    initialState : todoCollectionAdapter.getInitialState({loadstatus : "idle"}),
    reducers : {
        resaveInLocalStorage : (state, action) => {
            const entry = selectCollectionRecordsById(action.payload.state, action.payload.id)
            todoCollectionsDataAdapter.saveOne(entry)
        },
        addOneCollection : {
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
        removeOne : (state, action) => {
            todoCollectionAdapter.removeOne(state, action)
        },
        addOneTodoRecord : {
            prepare : action => {
                return {
                    payload : {
                        id : action.id,
                        state : action.state,
                        todoRecordId : action.todoRecordId
                    }
                }
            },
            reducer : (state, action) => {
                return todoCollectionAdapter.updateOne(state, {id : action.payload.id, changes : {todoRecordsIds : [action.payload.todoRecordId].concat(selectCollectionRecordsById(action.payload.state, action.payload.id).todoRecordsIds)}})
            }
        },
        unbindTodoRecord : {
            prepare : action => {
                return {
                    payload : {
                        id : action.id,
                        changes : {
                            todoRecordsIds : selectCollectionRecordsById(action.state, action.id).todoRecordsIds.filter(recordId => recordId != action.todoRecordId)
                        }
                    }
                }
            },
            reducer : (state, action) => {
                return todoCollectionAdapter.updateOne(state, action.payload)
            }
        },
        addManyCollections : todoCollectionAdapter.addMany
    },
    extraReducers : (builder) => {
        builder.addCase(todoRecordsCollectionStorageAdapter.thunks.loadAll.fulfilled, (state, action) => {
            state.loadstatus = "loaded"
            return todoCollectionAdapter.setAll(state, action.payload)
        })
    }
})

//export const addManyCollections = todoCollectionAdapter.addMany

export const {
    addOneCollection, 
    removeOne, 
    updateOne, 
    updateNameAndColor, 
    addOneTodoRecord, 
    unbindTodoRecord,
    addManyCollections,
    resaveInLocalStorage
} = todoRecordsCollection.actions


export default todoRecordsCollection.reducer

