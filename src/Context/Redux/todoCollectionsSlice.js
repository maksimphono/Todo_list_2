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
        removeOne : todoCollectionAdapter.removeOne,
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
        }
            
    }
})

export const {addOneCollection, removeOne, updateOne, updateNameAndColor, addOneTodoRecord, unbindTodoRecord} = todoRecordsCollection.actions

export default todoRecordsCollection.reducer