import { configureStore } from "@reduxjs/toolkit";
import todoRecordsReducer from "./todoRecordsSlice";
import todoRecordsCollectionReducer from "./todoCollectionsSlice";

export const store = configureStore({
    reducer : {
       "todoRecords" : todoRecordsReducer,
       "todoRecordsCollection" : todoRecordsCollectionReducer
    }
})
