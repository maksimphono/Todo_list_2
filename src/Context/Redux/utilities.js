import { store } from "./store";

import {addOne, removeOne, selectTodoRecordsById, alterTodoRecord} from "./todoRecordsSlice"

import {addOneTodoRecord, selectCollectionRecordsById, unbindTodoRecord} from "./todoCollectionsSlice"

import { createAsyncThunk } from "@reduxjs/toolkit";
import { todoRecordsDataAdapter } from "../../LocalStorage/initStorage";
import { todoCollectionsDataAdapter } from "../../LocalStorage/initStorage";
import {saveOneTodoRecordThunk} from "./todoRecordsSlice"

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

import { saveOneCollectionRecord } from "./todoCollectionsSlice";

export async function alterOneTodoRecord({dispatch, alteredTodoRecord}) {
    const oldRecord = selectTodoRecordsById(store.getState(), alteredTodoRecord.id)
    if (JSON.stringify(oldRecord) == JSON.stringify(alteredTodoRecord))
        return Promise.reject("Nothing to change!")
    else {
        if (alteredTodoRecord.collection != oldRecord.collection) {
            dispatch(unbindTodoRecord({id : oldRecord.collection, todoRecordId : oldRecord.id, state : store.getState()}))
            dispatch(addOneTodoRecord({id : alteredTodoRecord.collection, todoRecordId : alteredTodoRecord.id, state : store.getState()}))
            const newCollectionRecord = selectCollectionRecordsById(store.getState(), alteredTodoRecord.collection)
            const oldCollectionRecord = selectCollectionRecordsById(store.getState(), oldRecord.collection)
            
            dispatch(saveOneCollectionRecord(newCollectionRecord))
            dispatch(saveOneCollectionRecord(oldCollectionRecord))
        }
        dispatch(alterTodoRecord(alteredTodoRecord))
        dispatch(saveOneTodoRecordThunk(alteredTodoRecord))
        return "OK"
        
    }
}