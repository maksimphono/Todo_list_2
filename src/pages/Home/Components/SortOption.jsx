import React, { useCallback, useEffect, useMemo, useId } from 'react'

import { setSortParams, resetSortParams } from '../../../Context/Redux/sortTodoRecordsSlice'
import { useReducer } from 'react'
import { useDispatch } from 'react-redux'

import useFormSlice from '../hooks/useSortParametersFormSlice'
import useSliceInit from '../hooks/useSliceInit'

// styles
import style from "../styles/SortOption.module.scss"
import styled_buttons from "../../../buttons.module.scss"

const parameterItems = [
    {title : "Date", name : "dateEnd"}, 
    {title : "Title", name : "title"}, 
    {title : "collection", name : "collection"}
]

export default function SortOption() {
    const formSlice = useFormSlice()
    const [state, dispatch] = useReducer(formSlice.reducer, formSlice.getInitialState())
    const globalDispatch = useDispatch()
    const namePrefix = useId()
    const parameterRadioName = useMemo(() => namePrefix + "sort_parameter", []) 

    useSliceInit(dispatch, formSlice)

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
                        <label className = {style["reversed"]}>
                            <input 
                                type="checkbox"
                                checked = {state.parameter == parameterItem.name && state.reversed}
                                onChange = {() => state.parameter == parameterItem.name && dispatch(formSlice.actions.setReversed(!state.reversed))}
                            />
                            <span title='icon' className="material-symbols-outlined">expand_more</span>
                        </label>
                    </label>
            ))}
            
            <button className = {styled_buttons["success-btn"]}><span title='icon' className="material-symbols-outlined">check</span> Apply</button>
            <button 
                className = {styled_buttons["secondary-btn"]} 
                type = "button" 
                onClick = {handleReset}
            >
                    <span title='icon' className="material-symbols-outlined">restart_alt</span> Reset
            </button>
        </form>
    </>
  )
}