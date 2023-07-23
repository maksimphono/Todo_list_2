import { configureStore } from "@reduxjs/toolkit";
import todoRecordsReducer from "../../pages/Home/todoRecordsSlice";

export const store = configureStore({
    reducer : {
       "todoRecords" : todoRecordsReducer
    }
})
