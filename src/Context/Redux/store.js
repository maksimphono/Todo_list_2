import { configureStore } from "@reduxjs/toolkit";
import todoRecordsReducer from "./todoRecordsSlice";

export const store = configureStore({
    reducer : {
       "todoRecords" : todoRecordsReducer
    }
})
