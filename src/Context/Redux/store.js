import { configureStore } from "@reduxjs/toolkit";
import todoRecordsReducer from "./todoRecordsSlice";
import todoRecordsCollectionReducer from "./todoCollectionsSlice";
import filtersSliceReducer from "./filterTodoRecordsSlice"
import sortTodoRecordsReducer from "./sortTodoRecordsSlice";
import homePageViewModeReducer from "../../pages/Home/homePageViewModeSlice";

export const store = configureStore({
    reducer : {
        "todoRecords" : todoRecordsReducer,
        "todoRecordsCollection" : todoRecordsCollectionReducer,
        "filterTodoRecords" : filtersSliceReducer,
        "sortTodoRecords" : sortTodoRecordsReducer,
        "homePageViewMode" : homePageViewModeReducer
    }
})