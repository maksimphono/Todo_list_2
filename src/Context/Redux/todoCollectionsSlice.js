import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const todoCollectionAdapter = createEntityAdapter()

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
        addOneTodoRecord : (state, action) => {
            const id = action.payload.id;
            const options = {
                id : id,
                changes : {
                    todoRecordsIds : [action.payload.todoRecordId, ...selectCollectionRecordsById(state, id).todoRecordsIds]
                }
            }
            console.dir(options)
            //todoCollectionAdapter.updateOne(state, options)
        }
    }
})

export const {addOne, removeOne, updateOne, updateNameAndColor} = todoRecordsCollection.actions




export default todoRecordsCollection.reducer