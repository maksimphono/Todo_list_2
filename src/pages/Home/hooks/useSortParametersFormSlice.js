import { createSlice } from "@reduxjs/toolkit"
import { useMemo } from "react"
import useReduxStoreState from "../../../hooks/useReduxStoreState"

const formData = {
    __proto__ : null,
    reversed : false,
    parameter : null
}

export default function useFormSlice() {
    const storeState = useReduxStoreState()
    const slice = useMemo(() => {
        return createSlice({
            name : "sortParametersForm",
            initialState : formData,
            reducers : {
                init : (state, action) => {
                    const globalState = storeState.sortTodoRecords
    
                    if (globalState.parameter == null)
                        return formData
                    else
                        return globalState
                },
                setParameter : (state, action) => {
                    return {
                        ...state, 
                        parameter : action.payload
                    }
                },
                setReversed : (state, action) => {
                    return {
                        ...state,
                        reversed : action.payload
                    }
                },
                reset : () => {
                    return {...formData}
                }
            }
        })
    }, [])

    return slice
}