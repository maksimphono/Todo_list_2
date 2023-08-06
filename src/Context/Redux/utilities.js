import { store } from "./store";

import {addOne, removeOne, selectTodoRecordsById, alterTodoRecord, removeOneTodoRecordThunk, selectAllTodoRecords, removeMany, removeManyTodoRecordsThunk} from "./todoRecordsSlice"

import {addOneTodoRecord, resaveInLocalStorage, selectCollectionRecordsById, unbindTodoRecord, removeOne as collections_removeOne, removeOneCollectionRecordThunk} from "./todoCollectionsSlice"

import {saveOneTodoRecordThunk} from "./todoRecordsSlice"

export async function createTodoRecord(dispatch, todoRecord, collectionRecordId) {
    dispatch(addOne(todoRecord))
    dispatch(addOneTodoRecord({id : collectionRecordId, todoRecordId : todoRecord.id, state : store.getState()}))
    dispatch(saveOneTodoRecordThunk(todoRecord))
    dispatch(resaveInLocalStorage({id : collectionRecordId, state : store.getState()}))
    return "OK"
}

export async function removeOneTodoRecord({dispatch, todoRecordId, collectionId}) {
    dispatch(removeOne(todoRecordId))
    dispatch(removeOneTodoRecordThunk(todoRecordId))
    dispatch(unbindTodoRecord({id : collectionId, todoRecordId, state : store.getState()}))
    dispatch(resaveInLocalStorage({id : collectionId, todoRecordId, state : store.getState()}))
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
            
            dispatch(resaveInLocalStorage({id : oldRecord.collection, state : store.getState()}))
            dispatch(resaveInLocalStorage({id : alteredTodoRecord.collection, state : store.getState()}))
        }
        dispatch(alterTodoRecord(alteredTodoRecord))
        dispatch(saveOneTodoRecordThunk(alteredTodoRecord))
        return "OK"
        
    }
}

export async function removeOneCollectionRecord({dispatch, id, state}) {
    const todoRecordsIds = selectAllTodoRecords(state).filter(entry => entry.collection == id).map(entry => entry.id)

    dispatch(collections_removeOne(id))
    dispatch(removeMany(todoRecordsIds))

    dispatch(removeManyTodoRecordsThunk(todoRecordsIds))
    dispatch(removeOneCollectionRecordThunk(id))
    return "OK"
}