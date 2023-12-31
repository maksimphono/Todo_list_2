/* Explanation:
    Here I'm using 2 components <FiltersOption>, that gets exported as default and <SelectCollections>, that is used to
    represent list of checkboxes, determining, which collections user want to be in filters.
    Here I'm using Redux 'createSlice' to create slice, that will represent data inside the <form> and actions to
    manipulate that data. That slice will NOT be added to the global store, because I don't want let any other components
    dispatch actions, that can accidentally alter this filters. So I'm creating a local store, that is controlled only
    by components, related to that form and  it's data. I'm using 'useReducer' hook with that slice's reducer to
    manipulate form data. I'm also putting 'state' and 'dispatch', created by 'useReducer' to the React context, so
    every inner component can access and alter that data.
*/

import React, { useEffect, useId, useMemo, useReducer, useRef, useState, createContext, useContext } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { selectAllCollectionRecords, selectCollectionRecordsById, selectCollectionRecordsIds } from '../../../Context/Redux/todoCollectionsSlice';
import { setFilters, resetFilters } from '../../../Context/Redux/filterTodoRecordsSlice';
import useReduxStoreState from '../../../hooks/useReduxStoreState';

import useFormSlice, { useInitSlice } from '../hooks/useFilterParametersFormSlice';

import DatePicker from 'react-datepicker';
// <styles>
import style from "../styles/FiltersOption.module.scss"
import styled_buttons from "../../../buttons.module.scss"

// context will be used so every inner component can get access to that form data
const FormContext = createContext()

function SelectCollections() {
    const globalState = useReduxStoreState()
    const collectionsRecords = useSelector(() => selectAllCollectionRecords(globalState));
    const [state, dispatch, actions] = useContext(FormContext); // access to the data of the form

    return (
        <label name = "selectedCollection">
            Collections
            <details>
                <summary>{Object.values(state.selectedCollectionIds).filter(v => v).length}</summary>
                <ul>
                    <li>
                        <input
                            className = "selectAll" 
                            type="checkbox"
                            checked = {Object.values(state.selectedCollectionIds).every(v => v)}
                            onChange = {(event) => {
                                dispatch(actions.setAllCollectionIds({value : event.target.checked, ids : selectCollectionRecordsIds(globalState)}))
                            }}
                        />
                        <span style = {{color : "#000"}}>All</span>
                    </li>
                    {collectionsRecords.map(record => (
                        <li key = {record.id}
                            style = {{
                                background : record.color,
                            }}
                            >
                            <input
                                className = "setCollectionIds" 
                                type="checkbox"
                                checked = {!!state.selectedCollectionIds[record.id]}
                                onChange = {(event) => {
                                    dispatch(actions.setCollectionIds(record.id))
                                }}
                            />
                            <span style = {{color : ((parseInt((record?.color || "#000").slice(1, 7), 16) > 0x7fffff)?"#000":"#eee")}}>{record.name}</span>
                        </li>
                    ))}
                </ul>
            </details>
        </label>
    )
}

export default function FiltersOption() {
    const formSlice = useFormSlice()

    const [state, dispatch] = useReducer(formSlice.reducer, formSlice.getInitialState()) // create state and 'dispatch' method
    const globalDispatch = useDispatch();
    const globalState = useReduxStoreState()

    useInitSlice(dispatch, formSlice)

    const handleApplyfilters = event => {
        event.preventDefault()
        globalDispatch(setFilters(JSON.parse(JSON.stringify(state))))
    }

    const handleFiltersReset = () => {
        globalDispatch(resetFilters())
        dispatch(formSlice.actions.resetData())
        dispatch(
            formSlice.actions
                .setAllCollectionIds({
                    value : true,
                    ids : selectCollectionRecordsIds(globalState)
                }
            )
        )
    }

    const todoLoadStatus = useSelector(state => state.todoRecords.loadstatus)
    const collectionsLoadStatus = useSelector(state => state.todoRecordsCollection.loadstatus)
    
    useEffect(() => {
        if (!globalState.filterTodoRecords.filtersEnabled) {
            dispatch(
                formSlice.actions
                    .setAllCollectionIds({
                        value : true,
                        ids : selectCollectionRecordsIds(globalState)
                    }
                )
            )
        }
        
    }, [todoLoadStatus, collectionsLoadStatus])

    return (
        <FormContext.Provider value = {[state, dispatch, formSlice.actions]}>
            <form className = {style["filter_option"]} onSubmit = {handleApplyfilters}>
                <label name = "searchbar">
                    Search by title
                    <input 
                        type="text" 
                        value = {state.searchFieldValue} 
                        onChange={event => dispatch(formSlice.actions.setSearchFieldValue(event.target.value))} 
                    />
                    <button 
                        type='button' 
                        name = 'clear' 
                        onClick = {() => dispatch(formSlice.actions.setSearchFieldValue(""))}
                    >
                        <span title='icon' className="material-symbols-outlined">close</span>
                    </button>
                </label>
                <SelectCollections />
                <label name = "datepick">
                    End date from
                    <DatePicker
                        selected = {state.selectedEndDateFrom}
                        onChange = {(date) => dispatch(formSlice.actions.setEndDateFrom(date))}
                        dateFormat = "dd-MM-yyyy"
                        placeholderText='Select a Date'
                    />
                    <button 
                        type='button' 
                        name = 'clear' 
                        onClick = {() => dispatch(formSlice.actions.setEndDateFrom(""))}
                    >
                        <span title='icon' className="material-symbols-outlined">close</span>
                    </button>
                </label>
                <label name = 'datepick'>
                    End date to
                    <DatePicker
                        selected = {state.selectedEndDateTo}
                        onChange = {(date) => dispatch(formSlice.actions.setEndDateTo(date))}
                        dateFormat = "dd-MM-yyyy"
                        placeholderText='Select a Date'
                    />
                    <button 
                        type='button' 
                        name = 'clear' 
                        onClick = {() => dispatch(formSlice.actions.setEndDateTo(""))}
                    >
                        <span title='icon' className="material-symbols-outlined">close</span>
                    </button>
                </label>
                <button className = {styled_buttons["success-btn"]} type='submit'><span title='icon' className="material-symbols-outlined">check</span> Apply filters</button>
                <button className = {styled_buttons["secondary-btn"]} onClick = {handleFiltersReset} type = "button"><span title='icon' className="material-symbols-outlined">restart_alt</span> Reset</button>

            </form>
        </FormContext.Provider>
    )
}
