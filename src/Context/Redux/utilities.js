import { store } from "./store";

import {addOne, removeOne} from "./todoRecordsSlice"

import {addOneTodoRecord, unbindTodoRecord} from "./todoCollectionsSlice"

export function createTodoRecord(dispatch, todoRecord, collectionRecordId) {
    dispatch(addOne(todoRecord))
    dispatch(addOneTodoRecord({id : collectionRecordId, todoRecordId : todoRecord, state : store.getState()}))
}
  
export function removeOneTodoRecord({dispatch, todoRecordId, collectionId}) {
    dispatch(removeOne(todoRecordId))
    dispatch(unbindTodoRecord({id : collectionId, todoRecordId, state : store.getState()}))
}  