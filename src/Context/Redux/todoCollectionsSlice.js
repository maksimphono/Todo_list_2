import { createAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const todoCollectionAdapter = createEntityAdapter()

export const {
    selectAll : selectAllCollectionRecords, 
    selectById : selectCollectionRecordsById,
    selectIds : selectCollectionRecordsIds,
    selectEntities : selectCollectionRecordsEntries,
} = todoCollectionAdapter.getSelectors(state => state.todoRecordsCollection)


const todoRecordsCollection = createSlice({
    name : "todoRecordsCollection",
    initialState : {ids : [], entities : {}},//todoCollectionAdapter.getInitialState(),
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
    },
    extraReducers : (builder) => {
        builder.addCase(addOneTodoRecord, (state, action) => {
            console.log("Collection record:")
            //console.dir(state)
            console.dir(selectCollectionRecordsById(action.payload.state, action.payload.id))
            return todoCollectionAdapter.updateOne(state, {id : action.payload.id, changes : {todoRecordsIds : [action.payload.todoRecordId, ...selectCollectionRecordsById(action.payload.state, action.payload.id).todoRecordsIds]}})
        })
    }
})

/*
    reducer : (state, action) => {
                return todoCollectionAdapter.updateOne(state, {id : action.payload.id, changes : {todoRecordsIds : ["New todo id", ...selectCollectionRecordsById(store.getState(), action.payload.id).todoRecordsIds]}})
            }
            
        }
*/

export const addOneTodoRecord = createAction("todoRecordsCollection/addOneTodoRecord", (action) => {
    console.log("Add todo record : ")
    console.dir(action)
    return {
        payload : {
            id : action.id,
            state : action.state,
            todoRecordId : action.todoRecordId
        }
    }
})

export const {addOne, removeOne, updateOne, updateNameAndColor} = todoRecordsCollection.actions

export default todoRecordsCollection.reducer