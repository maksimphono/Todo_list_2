import { store } from "./store";

import {addOne, removeOne, selectTodoRecordsById, alterTodoRecord} from "./todoRecordsSlice"

import {addOneTodoRecord, unbindTodoRecord} from "./todoCollectionsSlice"

export async function createTodoRecord(dispatch, todoRecord, collectionRecordId) {
    dispatch(addOne(todoRecord))
    dispatch(addOneTodoRecord({id : collectionRecordId, todoRecordId : todoRecord, state : store.getState()}))
    return "OK"
}

export async function removeOneTodoRecord({dispatch, todoRecordId, collectionId}) {
    dispatch(removeOne(todoRecordId))
    dispatch(unbindTodoRecord({id : collectionId, todoRecordId, state : store.getState()}))
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
        }
        dispatch(alterTodoRecord(alteredTodoRecord))
        return "OK"
        
    }
}