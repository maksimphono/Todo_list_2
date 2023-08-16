import useReduxStoreState from "../../../hooks/useReduxStoreState"
import { useMemo, useEffect } from "react"
import { createSlice } from "@reduxjs/toolkit"

const formData = {
    __proto__ : null,
    selectedEndDateTo : "",
    selectedEndDateFrom : "",
    selectedCollectionIds : Object.create(null),
    searchFieldValue : ""
}

export const useInitSlice = (dispatch, slice) => {
    useEffect(() => {
        dispatch(slice.actions.init());
    }, [])
}

export default function useFormSlice() {
    const storeState = useReduxStoreState()

    const slice = useMemo(() => createSlice({
        name : "formSlice",
        initialState : formData,
        reducers : {
            init : (state, action) => {
                const filtersInStore = storeState.filterTodoRecords
                const newState = {}
    
                if (!filtersInStore.filtersEnabled)
                    return formData
                
                for (let field in filtersInStore) {
                    newState[field] = filtersInStore[field]
                }
                newState.selectedEndDateTo = (newState?.selectedEndDateTo)?(new Date(newState?.selectedEndDateTo)):""
                newState.selectedEndDateFrom = (newState?.selectedEndDateFrom)?(new Date(newState?.selectedEndDateFrom)):""
                return newState
            },
            setSearchFieldValue : (state, action) => {
                return {...state, searchFieldValue : action.payload}
            },
            setEndDateTo : (state, action) => {
                return {...state, selectedEndDateTo : action.payload}
            },
            setEndDateFrom : (state, action) => {
                return {...state, selectedEndDateFrom : action.payload}
            },
            setCollectionIds : (state, action) => {
                const selectedCollectionIds = {...(state.selectedCollectionIds)}
                if (selectedCollectionIds[action.payload]) {
                    selectedCollectionIds[action.payload] = false
                } else {
                    selectedCollectionIds[action.payload] = true
                }
                return {...state, selectedCollectionIds};
            },
            setAllCollectionIds : (state, action) => {
                const selectedCollectionIds = {...(state.selectedCollectionIds)}
                for (let id of action.payload.ids) {
                    selectedCollectionIds[id] = !!action.payload.value;
                }
                return {...state, selectedCollectionIds}
            },
            resetData : (state, action) => {
                return {...formData}
            }
        }
    }), [])

    return slice
}
