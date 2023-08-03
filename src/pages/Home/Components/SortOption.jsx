import React from 'react'
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
        }
    }
})

import { setSortParams, resetSortParams } from '../../../Context/Redux/sortTodoRecordsSlice'
import { useReducer } from 'react'
import { useDispatch } from 'react-redux'

export default function SortOption() {
    const [state, dispatch] = useReducer(formSlice.reducer, formSlice.getInitialState())
    const globalDispatch = useDispatch()
    const namePrefix = useId()
    const parameterRadioName = useMemo(() => namePrefix + "sort_parameter", []) 

    const handleSubmit = event => {
        event.preventDefault()
        globalDispatch(setSortParams(state))
    }

    return (
    <>
        <form className = {style["sort_option"]} onSubmit = {handleSubmit}>
            <label className = {style["parameter"]}>
                <h2>By Date</h2>
                <input 
                    type="radio" 
                    name = {parameterRadioName} 
                    checked = {state.parameter == "dateEnd"}
                    onChange = {event => dispatch(formSlice.actions.setParameter("dateEnd"))}
                />
                <input 
                    type="checkbox"
                    className = {style["reversed"]} 
                    checked = {state.parameter == "dateEnd" && state.reversed}
                    onChange = {() => state.parameter == "dateEnd" && dispatch(formSlice.actions.setReversed(!state.reversed))}
                />
            </label>
            <label className = {style["parameter"]}>
                <h2>By Title</h2>
                <input 
                    type="radio" 
                    name = {parameterRadioName} 
                    checked = {state.parameter == "title"}
                    onChange = {event => dispatch(formSlice.actions.setParameter("title"))}
                />
                <input 
                    type="checkbox" 
                    className = {style["reversed"]} 
                    checked = {state.parameter == "title" && state.reversed}
                    onChange = {(event) => state.parameter == "title" && dispatch(formSlice.actions.setReversed(!state.reversed))}
                />
            </label>
            <label className = {style["parameter"]}>
                <h2>By Collection</h2>
                <input 
                    type="radio" 
                    name = {parameterRadioName} 
                    checked = {state.parameter == "collection"}
                    onChange = {event => dispatch(formSlice.actions.setParameter("collection"))}
                />
                <input 
                    type="checkbox" 
                    className = {style["reversed"]} 
                    checked = {state.parameter == "collection" && state.reversed}
                    onChange = {(event) => state.parameter == "collection" && dispatch(formSlice.actions.setReversed(!state.reversed))}
                />

            </label>
            <button className = {styled_buttons["success-btn"]}>Apply</button>
            <button className = {styled_buttons["secondary-btn"]}>Reset</button>
        </form>
    </>
  )
}
