import { configureStore } from "@reduxjs/toolkit";
import todoRecordsReducer from "./todoRecordsSlice";
import todoRecordsCollectionReducer from "./todoCollectionsSlice";
import filtersSliceReducer from "./filterTodoRecordsSlice"
import sortTodoRecordsReducer from "./sortTodoRecordsSlice";

export const store = configureStore({
    reducer : {
        "todoRecords" : todoRecordsReducer,
        "todoRecordsCollection" : todoRecordsCollectionReducer,
        "filterTodoRecords" : filtersSliceReducer,
        "sortTodoRecords" : sortTodoRecordsReducer
    }
})