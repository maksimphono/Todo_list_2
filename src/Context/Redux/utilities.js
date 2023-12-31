import { store } from "./store";

import {
    addOne, 
    removeOne, 
    selectTodoRecordsById, 
    alterTodoRecord, 
    selectAllTodoRecords, 
    removeMany, 
    todoRecordsStorageThunks
} from "./todoRecordsSlice"

import {
    addOneTodoRecord, 
    unbindTodoRecord, 
    removeOne as collections_removeOne, 
    selectCollectionRecordsById,
    
    collectionsRecordsThunks
} from "./todoCollectionsSlice"

function putCollectionToLocalStorage({dispatch, state, id}) {
    const entry = selectCollectionRecordsById(state, id)
    dispatch(collectionsRecordsThunks.saveOne(entry))
}

function putTodoRecordToLocalStorage({dispatch, state, id}) {
    const entry = selectTodoRecordsById(state, id)
    dispatch(todoRecordsStorageThunks.saveOne(entry))
}

export async function createTodoRecord(dispatch, todoRecord, collectionRecordId) {
    dispatch(addOne(todoRecord))
    dispatch(addOneTodoRecord({id : collectionRecordId, todoRecordId : todoRecord.id, state : store.getState()}))
    dispatch(todoRecordsStorageThunks.saveOne(todoRecord))
    putCollectionToLocalStorage({dispatch, state : store.getState(), id : collectionRecordId})
    return "OK"
}

export async function removeOneTodoRecord({dispatch, todoRecordId, collectionId}) {
    dispatch(removeOne(todoRecordId))
    dispatch(todoRecordsStorageThunks.removeOne(todoRecordId))
    dispatch(unbindTodoRecord({id : collectionId, todoRecordId, state : store.getState()}))
    putCollectionToLocalStorage({dispatch, state : store.getState(), id : collectionId})
    return "OK"
}
export async function alterOneTodoRecord({dispatch, alteredTodoRecord}) {
    const oldRecord = selectTodoRecordsById(store.getState(), alteredTodoRecord.id)
    if (JSON.stringify(oldRecord) == JSON.stringify(alteredTodoRecord))
        return Promise.reject("Nothing to change!")
    else {
        if (alteredTodoRecord.collection != oldRecord.collection) {
            dispatch(unbindTodoRecord({id : oldRecord.collection, todoRecordId : oldRecord.id, state : store.getState()}))
            dispatch(addOneTodoRecord({id : alteredTodoRecord.collection, todoRecordId : alteredTodoRecord.id, state : store.getState()}))

            putCollectionToLocalStorage({dispatch, id : oldRecord.collection, state : store.getState()})
            putCollectionToLocalStorage({dispatch, id : alteredTodoRecord.collection, state : store.getState()})
        }
        dispatch(alterTodoRecord(alteredTodoRecord))
        dispatch(todoRecordsStorageThunks.saveOne(alteredTodoRecord))
        return "OK"
        
    }
}

export async function removeOneCollectionRecord({dispatch, id, state}) {
    const todoRecordsIds = selectAllTodoRecords(state).filter(entry => entry.collection == id).map(entry => entry.id)

    dispatch(collections_removeOne(id))
    dispatch(removeMany(todoRecordsIds))

    dispatch(todoRecordsStorageThunks.removeMany(todoRecordsIds))
    dispatch(collectionsRecordsThunks.removeOne(id))
    return "OK"
}

import { addOneCollection, updateNameAndColor } from "./todoCollectionsSlice";

export async function createOneCollection({dispatch, entry}) {
    dispatch(addOneCollection(entry))
    dispatch(collectionsRecordsThunks.saveOne(entry))
}

export async function updateOneCollection({dispatch, entry}) {
    dispatch(updateNameAndColor(entry))
    dispatch(collectionsRecordsThunks.saveOne(entry))
}