import React, { useCallback } from 'react'
import { useMemo } from 'react'
import { useId } from 'react'
import { createSlice } from '@reduxjs/toolkit'

import style from "../styles/SortOption.module.scss"
import styled_buttons from "../../../buttons.module.scss"

const formData = {
    __proto__ : null,
    reversed : false,
    parameter : null
}

const formSlice = createSlice({
    name : "sortParametersForm",
    initialState : formData,
    reducers : {
        init : (state, action) => {
            const globalState = store.getState().sortTodoRecords
            
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

import { setSortParams, resetSortParams } from '../../../Context/Redux/sortTodoRecordsSlice'
import { useReducer } from 'react'
import { useDispatch } from 'react-redux'
import { store } from '../../../Context/Redux/store'

const parameterItems = [
    {title : "Date", name : "dateEnd"}, 
    {title : "Title", name : "title"}, 
    {title : "collection", name : "collection"}
]

import { useEffect } from 'react'

export default function SortOption() {
    const [state, dispatch] = useReducer(formSlice.reducer, formSlice.getInitialState())
    const globalDispatch = useDispatch()
    const namePrefix = useId()
    const parameterRadioName = useMemo(() => namePrefix + "sort_parameter", []) 

    useEffect(() => {
        dispatch(formSlice.actions.init())
    }, [])

    const handleSubmit = useCallback(event => {
        event.preventDefault()
        globalDispatch(setSortParams(state))
    }, [state])

    const handleReset = useCallback(event => {
        dispatch(formSlice.actions.reset)
        globalDispatch(resetSortParams())
    }, [state])

    return (
    <>
        <form className = {style["sort_option"]} onSubmit = {handleSubmit}>
            {parameterItems
                .map(parameterItem => (
                    <label className = {style["parameter"]}>
                        <h2>By {parameterItem.title}</h2>
                        <input 
                            type="radio" 
                            name = {parameterRadioName} 
                            checked = {state.parameter == parameterItem.name}
                            onChange = {event => dispatch(formSlice.actions.setParameter(parameterItem.name))}
                        />
                        <input 
                            type="checkbox"
                            className = {style["reversed"]} 
                            checked = {state.parameter == parameterItem.name && state.reversed}
                            onChange = {() => state.parameter == parameterItem.name && dispatch(formSlice.actions.setReversed(!state.reversed))}
                        />
                    </label>
            ))}
            
            <button className = {styled_buttons["success-btn"]}>Apply</button>
            <button 
                className = {styled_buttons["secondary-btn"]} 
                type = "button" 
                onClick = {handleReset}
            >
                    Reset
            </button>
        </form>
    </>
  )
}
